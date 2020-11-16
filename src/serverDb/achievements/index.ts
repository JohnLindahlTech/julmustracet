import * as Sentry from "@sentry/node";
import { julmustracetDb } from "../dbs";
import onChangeHandler from "./onChangeHandler";
import { init } from "../../lib/sentry";

init();

export default async function crunch() {
  console.info("Starting Achievement Cruncher");
  const changes = julmustracetDb
    .changes({
      live: true,
      since: "now",
      filter: "type",
      query_params: { type: "drink" },
    })
    .on("change", async (change) => {
      try {
        await onChangeHandler(change);
      } catch (error) {
        Sentry.captureException(error);
        console.error(error);
        try {
          await Sentry.flush(2000);
        } catch (err) {
          // if it fails it fails
        }
      }
    })
    .on("error", async (error) => {
      Sentry.captureException(error);
      console.error(error);
      try {
        await Sentry.flush(2000);
      } catch (err) {
        // if it fails it fails
      }
    });
  return () => {
    console.info("Closing Down Achievement Cruncher");
    changes.cancel();
  };
}

crunch();
