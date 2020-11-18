import { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";
import { authDb, julmustracetDb, userDb } from "../../../serverDb/dbs";
import { User } from "../../../serverDb/models";
import { getSession } from "next-auth/client";
import { toId } from "../../../db/toId";
import cookies from "../../../lib/cookiesMiddleware";
import {
  createAuthCookie,
  cookies as authCookies,
} from "../../../lib/createAuthCookie";
import * as Sentry from "@sentry/node";

const baseUrl = process.env.NEXTAUTH_URL;
const secret = process.env.NEXTAUTH_SECRET;

const useSecureCookies = baseUrl.startsWith("https://");

// Default to __Host- for CSRF token for additional protection if using useSecureCookies
// NB: The `__Host-` prefix is stricter than the `__Secure-` prefix.
const csrfTokenCookieName = `${
  useSecureCookies ? "__Host-" : ""
}next-auth.csrf-token`;

class RequestError extends Error {
  name: string;
  statusCode: number;
  errorCode: string;
  rootError: Error;

  constructor(message: string, statusCode = 400, errorCode?, rootError?) {
    super(message);
    this.name = "RequestError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.rootError = rootError;
  }
  format() {
    const res = {
      message: this.message,
      name: this.name,
      statusCode: this.statusCode,
      errorCode: this.errorCode,
    } as Record<string, unknown>;
    if (process.env.NODE_ENV !== "production") {
      res.stack = this.stack.split("\n");
      res.rootError = this.rootError;
    }
    return res;
  }
}

class ValidationError extends RequestError {
  name: string;
  constructor(message: string, statusCode = 400, errorCode?, rootError?) {
    super(message, statusCode, errorCode, rootError);
    this.name = "ValidationError";
  }
}

function filterWhitelistedFields(user) {
  if (!user) {
    return user;
  }

  const {
    type,
    name,
    email,
    image,
    roles,
    username,
    updatedAt,
    createdAt,
  } = user;

  return {
    type,
    name,
    email,
    image,
    roles,
    username,
    updatedAt,
    createdAt,
  };
}

export async function checkDBUsername(username) {
  let res;
  try {
    res = await userDb.find({
      selector: {
        username,
      },
      limit: 1,
      use_index: "find-by-username",
    });
  } catch (error) {
    throw new RequestError("DB error", error.status ?? 400, "db", error);
  }
  if (res.docs.length === 0) {
    return username;
  }
  throw new ValidationError("Username is taken", 409, "username.conflict");
}

async function validateUsername(username, currentUsername) {
  if (!username) {
    throw new ValidationError("missing username", 422, "username.missing");
  }
  if (username === currentUsername) {
    return username;
  }
  await Promise.all([
    checkDBUsername(username),
    checkDBUsername(toId(username)),
  ]);
  return username;
}

async function updateItems(currentUsername: string, newUsername: string) {
  const { docs } = await julmustracetDb.find({
    selector: {
      username: currentUsername,
    },
    use_index: "find-by-username",
  });

  const toUpdate = docs.reduce((a, doc) => {
    a.push({ ...doc, _deleted: true });
    a.push({
      ...doc,
      _id: doc._id.replace(toId(currentUsername), toId(newUsername)),
      _rev: undefined,
      username: newUsername,
      updatedAt: new Date().toJSON(),
    });
    return a;
  }, []);
  return julmustracetDb.bulkDocs(toUpdate);
}

async function checkCSRF(req): Promise<void> {
  const { body } = req;
  const { csrfToken: csrfTokenFromPost } = body;

  let csrfTokenVerified = false;
  if (req.cookies[csrfTokenCookieName]) {
    const [csrfTokenValue, csrfTokenHash] = req.cookies[
      csrfTokenCookieName
    ].split("|");
    if (
      csrfTokenHash ===
      createHash("sha256").update(`${csrfTokenValue}${secret}`).digest("hex")
    ) {
      // If hash matches then we trust the CSRF token value

      // If this is a POST request and the CSRF Token in the Post request matches
      // the cookie we have already verified is one we have set, then token is verified!
      if (csrfTokenValue === csrfTokenFromPost) {
        csrfTokenVerified = true;
      }
    }
  }
  if (!csrfTokenVerified) {
    throw new RequestError("Invalid CSRF", 403, "csrf");
  }
}

async function editUser({ req, res, session }) {
  await checkCSRF(req);
  const { body } = req;
  try {
    const currentUser = new User(
      await userDb.get(User.buildId(session.user.email))
    );
    const currentUsername = currentUser.username;
    if (currentUsername === body?.username) {
      return filterWhitelistedFields(currentUser.toDoc(false));
    }
    const username = await validateUsername(
      body?.username,
      currentUser?.username
    );
    currentUser.changeUsername(username);
    await updateItems(currentUsername, username);

    const doc = currentUser.toDoc(true);
    try {
      await userDb.put(doc);
    } catch (error) {
      if (error.error === "forbidden") {
        throw new ValidationError(
          error.error,
          error.status,
          error.reason,
          error
        );
      }
    }
    await createAuthCookie(req, res, currentUser);
    return filterWhitelistedFields(doc);
  } catch (error) {
    if (error.name === "ValidationError") {
      throw error;
    }
    throw new RequestError("EditError", error.status ?? 400, "db", error);
  }
}

async function getUser({ req, session }) {
  try {
    const user = await userDb.get(User.buildId(session.user.email));
    return filterWhitelistedFields(user);
  } catch (error) {
    throw new RequestError("DB Error", error.status ?? 400, "db", error);
  }
}

async function deleteJulmust(username) {
  const { docs } = await julmustracetDb.find({
    selector: {
      username,
    },
    use_index: "find-by-username",
  });
  docs.forEach((d) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    d._deleted = true;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    d.updatedAt = new Date().toJSON();
  });
  await julmustracetDb.bulkDocs(docs);
}

async function deleteAccounts(email) {
  const { docs } = await authDb.find({
    selector: {
      type: "account",
      userId: User.buildId(email),
    },
    use_index: "account-by-userid",
  });
  docs.forEach((d) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    d._deleted = true;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    d.updatedAt = new Date().toJSON();
  });
  await authDb.bulkDocs(docs);
}

async function deleteVerificationRequests(email) {
  const { docs } = await authDb.find({
    selector: {
      type: "verification-request",
      identifier: email,
    },
    use_index: "verification-request-by-email",
  });
  docs.forEach((d) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    d._deleted = true;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    d.updatedAt = new Date().toJSON();
  });
  await authDb.bulkDocs(docs);
}

async function removeUser({ req, res, session }) {
  await checkCSRF(req);
  try {
    const currentUser = new User(
      await userDb.get(User.buildId(session.user.email))
    );
    currentUser.delete();
    await deleteJulmust(currentUser.username);
    await deleteAccounts(currentUser.email);
    await deleteVerificationRequests(currentUser.email);
    await userDb.put(currentUser.toDoc(true));
    res.cookie(authCookies.sessionToken.name, "", {
      ...authCookies.sessionToken.options,
      maxAge: 0,
    });
    return {};
  } catch (error) {
    throw new RequestError("DB Error", error.status ?? 400, "db", error);
  }
}

async function getResultFromMethod({ req, res, session }) {
  switch (req.method.toUpperCase()) {
    case "GET":
      return await getUser({ req, session });
    case "PATCH":
      return await editUser({ req, res, session });
    case "DELETE":
      return await removeUser({ req, res, session });
    default:
      throw new RequestError("Method not allowed", 405, "method.not_allowed");
  }
}

async function UserEndpoint(req: NextApiRequest, res: NextApiResponse) {
  // TODO Check for CSRF-token in request.
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }
  try {
    const result = await getResultFromMethod({ req, res, session });
    res.send(result);
  } catch (error) {
    Sentry.captureException(error);
    try {
      await Sentry.flush(2000);
    } catch (err) {
      // if it fails it fails
    }
    console.error(error);
    res.status(error.statusCode ?? 400);
    res.send(error.format());
  }
}

export default cookies(UserEndpoint);
