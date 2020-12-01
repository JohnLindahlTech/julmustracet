import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import {
  LogIn,
  LogOut,
  UserEdit,
  VerifyEmail,
  AuthError,
} from "../../../routes";
import Adapter from "../../../serverDb/adapter";
import {
  sessionCallback,
  jwtCallback,
  jwtDecode,
  jwtEncode,
  maxAge,
} from "../../../lib/createAuthCookie";
import { sendVerificationRequest } from "../../../lib/sendVerificationRequest";

const isProd = process.env.NODE_ENV === "production";
const debugOverRide = process.env.DEBUG === "true";

const options = {
  adapter: Adapter(),
  // @link https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Email({
      // SMTP connection string or nodemailer configuration object https://nodemailer.com/
      server: process.env.NEXTAUTH_EMAIL_SERVER,
      // Email services often only allow sending email from a valid/verified address
      from: process.env.NEXTAUTH_EMAIL_FROM,
      sendVerificationRequest: sendVerificationRequest,
    }),
    // When configuring oAuth providers make sure you enabling requesting
    // permission to get the users email address (required to sign in)
    Providers.Google({
      clientId: process.env.NEXTAUTH_GOOGLE_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
      state: false,
    }),
    Providers.Facebook({
      clientId: process.env.NEXTAUTH_FACEBOOK_ID,
      clientSecret: process.env.NEXTAUTH_FACEBOOK_SECRET,
      state: false,
    }),
    Providers.Twitter({
      clientId: process.env.NEXTAUTH_TWITTER_ID,
      clientSecret: process.env.NEXTAUTH_TWITTER_SECRET,
      state: false,
    }),
    Providers.GitHub({
      clientId: process.env.NEXTAUTH_GITHUB_ID,
      clientSecret: process.env.NEXTAUTH_GITHUB_SECRET,
      state: false,
    }),
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      state: false,
    }),
  ],

  // @link https://next-auth.js.org/configuration/databases
  database: process.env.COUCHDB_ADMIN_URL,

  // @link https://next-auth.js.org/configuration/options#session
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge,
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // @link https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret if not explicitly specified.
    secret: process.env.NEXTAUTH_JWT_SECRET,
    // Set to true to use encryption. Defaults to false (signing only).
    // encryption: process.env.NODE_ENV === "production",
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    encode: jwtEncode,
    decode: jwtDecode,
  },

  // @link https://next-auth.js.org/configuration/callbacks
  callbacks: {
    /**
     * Intercept signIn request and return true if the user is allowed.
     *
     * @link https://next-auth.js.org/configuration/callbacks#sign-in-callback
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile
     * @return {boolean}         Return `true` (or a modified JWT) to allow sign in
     *                           Return `false` to deny access
     */
    signIn: async (/* user, account, profile */) => {
      return true;
    },

    /**
     * @link https://next-auth.js.org/configuration/callbacks#session-callback
     * @param  {object} session      Session object
     * @param  {object} user         User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @return {object}              Session that will be returned to the client
     */
    session: sessionCallback,

    /**
     * @link https://next-auth.js.org/configuration/callbacks#jwt-callback
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    jwt: jwtCallback,
  },
  // You can define custom pages to override the built-in pages
  // The routes shown here are the default URLs that will be used.
  // @link https://next-auth.js.org/configuration/pages
  pages: {
    signIn: LogIn.href,
    signOut: LogOut.href,
    error: AuthError.href, // Error code passed in query string as ?error= // TODO Handle this case.
    verifyRequest: VerifyEmail.href, // (used for check email message)
    newUser: UserEdit.href, // If set, new users will be directed here on first sign in
  },

  // Additional options
  secret: process.env.NEXTAUTH_SECRET, // Recommended (but auto-generated if not specified)
  debug: debugOverRide || !isProd, // Use this option to enable debug messages in the console
};

const Auth = (req, res) => {
  const opt = { ...options, req, res };
  return NextAuth(req, res, opt);
};

export default Auth;
