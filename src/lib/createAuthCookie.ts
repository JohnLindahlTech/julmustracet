import JWT from "jsonwebtoken";
import jwt from "next-auth/jwt";
import { CookieSerializeOptions } from "cookie";
import { getSession } from "next-auth/client";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../serverDb/models";
import { Session } from "../db/sessionDB";

const JWTSecret = process.env.NEXTAUTH_JWT_SECRET;
const baseUrl = process.env.NEXTAUTH_URL;

const useSecureCookies = baseUrl.startsWith("https://");
const cookiePrefix = useSecureCookies ? "__Secure-" : "";

export const cookies = {
  // default cookie options
  sessionToken: {
    name: `${cookiePrefix}next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: useSecureCookies,
    } as CookieSerializeOptions,
  },
};

//                     D    H    M    S
export const maxAge = 30 * 24 * 60 * 60; // 30 days

export const jwtEncode = async ({
  secret = JWTSecret,
  token,
}): Promise<string> => {
  const { exp, ...rest } = token;
  return JWT.sign(rest, secret, {
    algorithm: "HS512",
    expiresIn: maxAge,
  });
};

export const jwtDecode = async ({
  secret = JWTSecret,
  token,
}): Promise<Session["user"]> => {
  if (!token) {
    return null;
  }

  const data = JWT.verify(token, secret, {
    algorithms: ["HS512"],
  });
  return data as Session["user"];
};

export const sessionCallback = async (session, user) => {
  session.user.username = user.username;
  session.user.roles = user?.["_couchdb.roles"];
  return Promise.resolve(session);
};

export const jwtCallback = async (
  token?,
  user?,
  account?,
  profile?,
  isNewUser?
) => {
  // const isSignIn = (user) ? true : false
  // Add auth_time to token on signin in
  // if (isSignIn) { token.auth_time = Math.floor(Date.now() / 1000) }

  const username = user?.username ?? profile?.username ?? token?.username;
  let roles = user?.roles ?? token?.["_couchdb.roles"];

  if (!roles) {
    roles = [];
  }

  if (username && !roles.includes(username)) {
    roles = [username, ...roles];
  }

  token.sub = user?.email ?? profile?.email ?? token?.sub ?? token?.email;
  token["_couchdb.roles"] = roles;
  token.username = username;
  return Promise.resolve(token);
};

export async function createAuthCookie(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
): Promise<void> {
  const session = await getSession({ req });
  const currentRawToken = await jwt.getToken({ req, raw: true });
  const currentToken = await jwtDecode({ token: currentRawToken });
  const updatedToken = await jwtCallback(currentToken, user);
  const updatedRawToken = await jwtEncode({ token: updatedToken });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  res.cookie(cookies.sessionToken.name, updatedRawToken, {
    expires: new Date(session.expires),
    ...cookies.sessionToken.options,
  });
}
