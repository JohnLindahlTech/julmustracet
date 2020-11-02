import { createProxyMiddleware } from "http-proxy-middleware";

// Create proxy instance outside of request handler function to avoid unnecessary re-creation
const apiProxy = createProxyMiddleware({
  target: "http://localhost:5984",
  changeOrigin: true,
  pathRewrite: { [`^/api/db`]: "" },
  secure: false,
  onProxyReq: (proxyReq, req, res) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (req?.cookies?.["next-auth.session-token"]) {
      proxyReq.setHeader(
        "Authorization",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        `Bearer ${req.cookies["next-auth.session-token"]}`
      );
    }
  },
});

export default function DBProxy(req, res) {
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
    // Disable bodyParser because it messes with http-proxy-middleware
    bodyParser: false,
  },
};
