import * as Sentry from "@sentry/node";
import { Integrations } from "@sentry/tracing";
import { RewriteFrames } from "@sentry/integrations";

export const init = () => {
  console.log("Init Sentry");
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    console.log("Got DSN");
    const integrations = [];

    if (process.env.NEXT_IS_SERVER !== "true") {
      integrations.push(new Integrations.BrowserTracing());
    }

    if (
      process.env.NEXT_IS_SERVER === "true" &&
      process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR
    ) {
      console.log("RewriteFrames");
      // For Node.js, rewrite Error.stack to use relative paths, so that source
      // maps starting with ~/_next map to files in Error.stack with path
      // app:///_next
      integrations.push(
        new RewriteFrames({
          iteratee: (frame) => {
            frame.filename = frame.filename.replace(
              process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
              "app:///"
            );
            frame.filename = frame.filename.replace(".next", "_next");
            return frame;
          },
        })
      );
    }
    console.log("Sentry.Init", process.env.NODE_ENV);
    Sentry.init({
      enabled: process.env.NODE_ENV === "production",
      integrations,
      tracesSampleRate: 1.0,
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      release: process.env.NEXT_PUBLIC_COMMIT_SHA,
    });
  }
};
