import { createProxyMiddleware } from "http-proxy-middleware";
import { cookies } from "../../../lib/createAuthCookie";

// Create proxy instance outside of request handler function to avoid unnecessary re-creation
const apiProxy = createProxyMiddleware({
  target: "http://localhost:5984",
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
  apiProxy(req, res, (result) => {
    if (result instanceof Error) {
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
