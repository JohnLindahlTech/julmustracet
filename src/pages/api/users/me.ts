import { NextApiRequest, NextApiResponse } from "next";
import { julmustracetDb, userDb } from "../../../serverDb/dbs";
import { User } from "../../../serverDb/models";
import { getSession } from "next-auth/client";
import { toDrinkId, toAchievementId, toId } from "../../../serverDb/toId";
import cookies from "../../../lib/cookiesMiddleware";
import { createAuthCookie } from "../../../lib/createAuthCookie";

const firstYear = 2020;

class RequestError extends Error {
  name: string;
  statusCode: number;
  errorCode: string;
  rootError: Error;

  constructor(message, statusCode = 400, errorCode?, rootError?) {
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

async function checkDBUsername(username) {
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
  throw new RequestError("Username is taken", 409, "username.conflict");
}

async function validateUsername(username, currentUsername) {
  if (!username) {
    throw new RequestError("missing username", 422, "username.missing");
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

async function updateItems(
  year: number | string,
  currentUsername: string,
  newUsername: string,
  idGen: (year: number | string, username: string) => string
) {
  const startId = idGen(year, currentUsername);
  const res = await julmustracetDb.allDocs({
    include_docs: true,
    startkey: startId,
    endkey: `${startId}:\ufff0`,
  });
  const toUpdate = res.rows.reduce((a, { doc }) => {
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

function createYears(start, end) {
  const res = [];
  let i = start;
  while (i <= end) {
    res.push(i++);
  }
  return res;
}

async function updateAllYearsDrinks(
  years: number[],
  currentUsername: string,
  newUsername: string
) {
  return Promise.all(
    years.map((year) =>
      updateItems(year, currentUsername, newUsername, toDrinkId)
    )
  );
}

async function updateAllYearsAchievements(
  years: number[],
  currentUsername: string,
  newUsername: string
) {
  return Promise.all(
    years.map((year) =>
      updateItems(year, currentUsername, newUsername, toAchievementId)
    )
  );
}

async function editUser(req, res) {
  try {
    const { body } = req;
    const session = await getSession({ req });
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
    const years = createYears(firstYear, new Date().getFullYear());

    await Promise.all([
      updateAllYearsAchievements(years, currentUsername, username),
      updateAllYearsDrinks(years, currentUsername, username),
    ]);

    const doc = currentUser.toDoc(true);
    await userDb.put(doc);
    await createAuthCookie(req, res, currentUser);
    return filterWhitelistedFields(doc);
  } catch (error) {
    throw new RequestError("EditError", error.status ?? 400, "db", error);
  }
}

async function getUser(req) {
  try {
    const session = await getSession({ req });
    const user = await userDb.get(User.buildId(session.user.email));
    return filterWhitelistedFields(user);
  } catch (error) {
    throw new RequestError("DB Error", error.status ?? 400, "db", error);
  }
}

async function getResultFromMethod(req, res) {
  switch (req.method.toUpperCase()) {
    case "GET":
      return await getUser(req);
    case "PATCH":
      return await editUser(req, res);
    default:
      throw new RequestError("Method not allowed", 405, "method.not_allowed");
  }
}

async function UserEndpoint(req: NextApiRequest, res: NextApiResponse) {
  // TODO FIXME Check for CSRF-token in request.
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }
  try {
    const result = await getResultFromMethod(req, res);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode ?? 400);
    res.send(error.format());
  }
}

export default cookies(UserEndpoint);
