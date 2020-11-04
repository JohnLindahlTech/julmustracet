import PouchDB from "pouchdb";
import { createHash } from "crypto";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import Manager from "./manager";
import {
  Account,
  Session,
  User,
  VerificationRequest,
  IUser,
  ISession,
} from "./models";

const Adapter = (/* config, options = {} */) => {
  async function getAdapter(appOptions) {
    const couchdbUrl = process.env.COUCHDB_URL;
    const userDb = new PouchDB(`${couchdbUrl}/_users`, { skip_setup: true });
    const authDb = new PouchDB(`${couchdbUrl}/auth`, { skip_setup: true });
    const manager = new Manager(userDb, authDb);

    // Display debug output if debug option enabled
    function _debug(...args) {
      if (appOptions.debug) {
        console.log("[next-auth][debug]", ...args);
      }
    }
    //                           D    H    M    S    MS
    const defaultSessionMaxAge = 30 * 24 * 60 * 60 * 1000;
    const sessionMaxAge =
      appOptions && appOptions.session && appOptions.session.maxAge
        ? appOptions.session.maxAge * 1000
        : defaultSessionMaxAge;
    const sessionUpdateAge =
      appOptions && appOptions.session && appOptions.session.updateAge
        ? appOptions.session.updateAge * 1000
        : 0;

    async function createUser(profile) {
      _debug("createUser", profile);
      const user = new User({
        name: profile.email as string,
        username: profile.name as string,
        email: profile.email as string,
        image: profile.image as string,
        emailVerified: profile.emailVerified as boolean,
      });
      await manager.saveDoc(user);
      return user;
    }

    async function getUser(id) {
      _debug("getUser", id);
      try {
        const rawUser = await userDb.get(id);
        return new User(rawUser as IUser);
      } catch (err) {
        if (err.name) {
          return;
        }
        throw err;
      }
    }

    async function getUserByEmail(email) {
      _debug("getUserByEmail", email);
      if (!email) {
        return;
      }
      try {
        const doc = await userDb.get(User.buildId(email));
        return new User(doc as IUser);
      } catch (err) {
        if (err.name === "not_found") {
          return;
        }
        throw err;
      }
    }

    async function getUserByProviderAccountId(providerId, providerAccountId) {
      _debug("getUserByProviderAccountId", providerId, providerAccountId);
      let rawAccount;
      try {
        rawAccount = (await authDb.get(
          Account.buildId(providerId, providerAccountId)
        )) as Account;
      } catch (err) {
        if (err.name === "not_found") {
          return;
        }
        throw err;
      }
      if (!rawAccount?.userId) {
        return;
      }
      try {
        const rawUser = await userDb.get(User.buildId(rawAccount.userId));
        return new User(rawUser as IUser);
      } catch (err) {
        if (err.name == "not_found") {
          return;
        }
        throw err;
      }
    }

    async function updateUser(usr) {
      _debug("updateUser", usr);
      const user = new User(usr);
      await manager.saveDoc(user);
      return user;
    }

    async function deleteUser(userId) {
      _debug("deleteUser", userId);
      return manager.deleteById(User, User.buildId(userId));
    }

    async function linkAccount(
      userId: string,
      providerId: string,
      providerType: string,
      providerAccountId: string,
      refreshToken: string,
      accessToken: string,
      accessTokenExpires: string | Date
    ) {
      _debug(
        "linkAccount",
        userId,
        providerId,
        providerType,
        providerAccountId,
        refreshToken,
        accessToken,
        accessTokenExpires
      );
      const account = new Account({
        userId,
        providerId,
        providerType,
        providerAccountId,
        refreshToken,
        accessToken,
        accessTokenExpires,
      });
      await manager.saveDoc(account);
      return account;
    }

    async function unlinkAccount(userId, providerId, providerAccountId) {
      _debug("unlinkAccount", userId, providerId, providerAccountId);
      // TODO Implement this. Basically delete account?
      return;
    }

    async function createSession(user) {
      _debug("createSession", user);

      let expires;
      if (sessionMaxAge) {
        const dateExpires = new Date();
        dateExpires.setTime(dateExpires.getTime() + sessionMaxAge);
        expires = dateExpires;
      }

      const session = new Session({
        userId: user.id,
        expires,
      });

      await manager.saveDoc(session);
      return session;
    }

    async function getSession(sessionToken) {
      _debug("getSession", sessionToken);
      try {
        const rawSession = (await authDb.get(
          Session.buildId(sessionToken)
        )) as ISession;
        const session = new Session(rawSession);
        if (new Date() > session.expires) {
          await manager.deleteDoc(session);
          return;
        }
        return session;
      } catch (err) {
        if (err.name === "not_found") {
          return;
        }
        throw err;
      }
    }

    async function updateSession(session, force) {
      _debug("updateSession", session);
      if (
        sessionMaxAge &&
        (sessionUpdateAge || sessionUpdateAge === 0) &&
        session.expires
      ) {
        // Calculate last updated date, to throttle write updates to database
        // Formula: ({expiry date} - sessionMaxAge) + sessionUpdateAge
        //     e.g. ({expiry date} - 30 days) + 1 hour
        //
        // Default for sessionMaxAge is 30 days.
        // Default for sessionUpdateAge is 1 hour.
        const dateSessionIsDueToBeUpdated = new Date(session.expires);
        dateSessionIsDueToBeUpdated.setTime(
          dateSessionIsDueToBeUpdated.getTime() - sessionMaxAge
        );
        dateSessionIsDueToBeUpdated.setTime(
          dateSessionIsDueToBeUpdated.getTime() + sessionUpdateAge
        );

        // Trigger update of session expiry date and write to database, only
        // if the session was last updated more than {sessionUpdateAge} ago
        if (new Date() > dateSessionIsDueToBeUpdated) {
          const newExpiryDate = new Date();
          newExpiryDate.setTime(newExpiryDate.getTime() + sessionMaxAge);
          session.expires = newExpiryDate;
        } else if (!force) {
          return;
        }
      } else {
        // If session MaxAge, session UpdateAge or session.expires are
        // missing then don't even try to save changes, unless force is set.
        if (!force) {
          return;
        }
      }
      await manager.saveDoc(session);
      return session;
    }

    async function deleteSession(sessionToken) {
      _debug("deleteSession", sessionToken);
      return await manager.deleteById(Session, Session.buildId(sessionToken));
    }

    async function createVerificationRequest(
      identifier,
      url,
      token,
      secret,
      provider
    ) {
      _debug("createVerificationRequest", identifier);
      const uniqueMessage = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
      }); // big_red_donkey

      const { baseUrl } = appOptions;
      const { sendVerificationRequest, maxAge } = provider;

      // Store hashed token (using secret as salt) so that tokens cannot be exploited
      // even if the contents of the database is compromised.
      // @TODO Use bcrypt function here instead of simple salted hash
      const hashedToken = createHash("sha256")
        .update(`${token}${secret}`)
        .digest("hex");

      let expires;
      if (maxAge) {
        const dateExpires = new Date();
        dateExpires.setTime(dateExpires.getTime() + maxAge * 1000);
        expires = dateExpires;
      }

      const verificationRequest = new VerificationRequest({
        identifier,
        token: hashedToken,
        expires,
      });

      await manager.saveDoc(verificationRequest);

      await sendVerificationRequest({
        identifier,
        url,
        token,
        baseUrl,
        provider,
        uniqueMessage,
      });

      return verificationRequest;
    }

    async function getVerificationRequest(
      identifier,
      token,
      secret /* , provider */
    ) {
      _debug("getVerificationRequest", identifier, token);
      // @TODO Use bcrypt instead of salted SHA-256 hash for token
      const hashedToken = createHash("sha256")
        .update(`${token}${secret}`)
        .digest("hex");
      try {
        const rawVerificationRequest = await authDb.get(
          VerificationRequest.buildId(hashedToken)
        );
        const verificationRequest = new VerificationRequest(
          rawVerificationRequest
        );
        if (
          verificationRequest.expires &&
          new Date() > new Date(verificationRequest.expires)
        ) {
          await manager.deleteDoc(verificationRequest);
        }
        return verificationRequest;
      } catch (err) {
        if (err.name === "not_found") {
          return;
        }
      }
    }

    async function deleteVerificationRequest(
      identifier,
      token,
      secret /* , provider */
    ) {
      _debug("deleteVerification", identifier, token);
      const hashedToken = createHash("sha256")
        .update(`${token}${secret}`)
        .digest("hex");
      await manager.deleteById(
        VerificationRequest,
        VerificationRequest.buildId(hashedToken)
      );
    }

    return Promise.resolve({
      createUser,
      getUser,
      getUserByEmail,
      getUserByProviderAccountId,
      updateUser,
      deleteUser,
      linkAccount,
      unlinkAccount,
      createSession,
      getSession,
      updateSession,
      deleteSession,
      createVerificationRequest,
      getVerificationRequest,
      deleteVerificationRequest,
    });
  }

  return {
    getAdapter,
  };
};

export default Adapter;
