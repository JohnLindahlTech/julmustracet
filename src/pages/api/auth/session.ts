// Return a session object (without any private fields) for Single Page App clients
import cookie from "cookie";
import {
  maxAge,
  cookies,
  jwtDecode,
  jwtEncode,
  sessionCallback,
  jwtCallback,
} from "../../../lib/createAuthCookie";

export default async (req, res) => {
  const sessionMaxAge = maxAge;
  const sessionToken = req.cookies[cookies.sessionToken.name];

  if (!sessionToken) {
    res.setHeader("Content-Type", "application/json");
    res.json({});
    return;
  }

  try {
    // Decrypt and verify token
    const decodedJwt = await jwtDecode({ token: sessionToken });

    // Generate new session expiry date
    const sessionExpiresDate = new Date();
    sessionExpiresDate.setTime(
      sessionExpiresDate.getTime() + sessionMaxAge * 1000
    );
    const sessionExpires = sessionExpiresDate.toISOString();

    // By default, only exposes a limited subset of information to the client
    // as needed for presentation purposes (e.g. "you are logged in as…").
    const defaultSessionPayload = {
      user: {
        name: decodedJwt.name || null,
        email: decodedJwt.email || null,
        image: decodedJwt.picture || decodedJwt.image || null,
      },
      expires: sessionExpires,
    };

    // Pass Session and JSON Web Token through to the session callback
    const jwtPayload = await jwtCallback(decodedJwt);
    const sessionPayload = await sessionCallback(
      defaultSessionPayload,
      jwtPayload
    );

    // Refresh JWT expiry by re-signing it, with an updated expiry date
    const newEncodedJwt = await jwtEncode({ token: jwtPayload });

    // Set cookie, to also update expiry date on cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(cookies.sessionToken.name, newEncodedJwt, {
        expires: new Date(sessionExpires),
        ...cookies.sessionToken.options,
      })
    );

    res.setHeader("Content-Type", "application/json");
    res.json(sessionPayload);
  } catch (error) {
    // If JWT not verifiable, make sure the cookie for it is removed and return 401
    console.error("JWT_SESSION_ERROR", error);
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(cookies.sessionToken.name, "", {
        ...cookies.sessionToken.options,
        maxAge: 0,
      })
    );
    res.status(401).end();
  }
};
