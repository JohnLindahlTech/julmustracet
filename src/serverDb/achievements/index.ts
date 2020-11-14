import { julmustracetDb } from "../dbs";
import onChangeHandler from "./onChangeHandler";

export default function crunch() {
  console.log("Starting");
  const changes = julmustracetDb
    .changes({
      live: true,
      since: "now",
      filter: "type",
      query_params: { type: "drink" },
    })
    .on("change", async (change) => {
      await onChangeHandler(change);
    })
    .on("error", (error) => {
      console.error(error);
    });
  console.log("Started");
  return () => {
    console.log("Closing");
    changes.cancel();
  };
}

crunch();
