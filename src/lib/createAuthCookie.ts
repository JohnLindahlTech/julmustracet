import JWT from "jsonwebtoken";
import jwt from "next-auth/jwt";
import { getSession } from "next-auth/client";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../serverDb/models";

const secret = process.env.NEXTAUTH_JWT_SECRET;
const insecureCookieName = "next-auth.session-token";
const secureCookieName = `__Secure-${insecureCookieName}`;

export const cookieName =
  process.env.NODE_ENV === "production" ? secureCookieName : insecureCookieName;

//                     D    H    M    S
export const maxAge = 30 * 24 * 60 * 60; // 30 days

export const jwtEncode = async ({ secret, token }) => {
  const { exp, ...rest } = token;
  return JWT.sign(rest, secret, {
    algorithm: "HS512",
    expiresIn: maxAge,
  });
};

export const jwtDecode = async ({ secret, token }) => {
  if (!token) {
    return null;
  }

  const data = JWT.verify(token, secret, {
    algorithms: ["HS512"],
  });
  return data;
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
  const currentToken = await jwtDecode({ token: currentRawToken, secret });
  const updatedToken = await jwtCallback(currentToken, user);
  const updatedRawToken = await jwtEncode({ token: updatedToken, secret });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  res.cookie(cookieName, updatedRawToken, {
    expires: new Date(session.expires),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}
