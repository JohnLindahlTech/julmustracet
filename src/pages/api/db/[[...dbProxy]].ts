import { createProxyMiddleware } from "http-proxy-middleware";
import * as Sentry from "@sentry/node";
import { cookies } from "../../../lib/createAuthCookie";

// Create proxy instance outside of request handler function to avoid unnecessary re-creation
const apiProxy = createProxyMiddleware({
  target: process.env.COUCHDB_PROXY_URL,
  changeOrigin: true,
  pathRewrite: { [`^/api/db`]: "" },
  secure: false,
  onProxyReq: (proxyReq, req, res) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (req?.cookies?.[cookies.sessionToken.name]) {
      proxyReq.setHeader(
        "Authorization",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        `Bearer ${req.cookies[cookies.sessionToken.name]}`
      );
    }
  },
});

export default async function DBProxy(req, res) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  apiProxy(req, res, async (result) => {
    if (result instanceof Error) {
      console.error(result);
      Sentry.captureException(result);
      try {
        await Sentry.flush(2000);
      } catch (err) {
        // if it fails it fails
      }
      throw result;
    }

    throw new Error(
      `Request '${req.url}' is not proxied! We should never reach here!`
    );
  });
}

export const config = {
  api: {
    externalResolver: true,
    // Disable bodyParser because it messes with http-proxy-middleware
    bodyParser: false,
  },
};
