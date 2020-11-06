import { serialize, CookieSerializeOptions } from "cookie";

/**
 * This sets `cookie` on `res` object
 */
const cookie = (res, name, value, options: CookieSerializeOptions = {}) => {
  const stringValue =
    typeof value === "object" ? JSON.stringify(value) : String(value);

  const opts = { ...options };

  if ("maxAge" in opts) {
    opts.expires = new Date(Date.now() + opts.maxAge);
    opts.maxAge /= 1000;
  }

  res.setHeader("Set-Cookie", serialize(name, String(stringValue), opts));
};

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const cookies = (handler) => (req, res) => {
  res.cookie = (
    name: string,
    value: unknown,
    options: CookieSerializeOptions
  ) => cookie(res, name, value, options);

  return handler(req, res);
};

export default cookies;
