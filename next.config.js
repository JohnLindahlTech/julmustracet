/* eslint-disable @typescript-eslint/no-var-requires */
const routes = require("./src/routes");
const withPWA = require("next-pwa");
const withSourceMaps = require("@zeit/next-source-maps")();
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
  VERCEL_GITLAB_COMMIT_SHA,
  VERCEL_BITBUCKET_COMMIT_SHA,
} = process.env;

const COMMIT_SHA =
  VERCEL_GITHUB_COMMIT_SHA ||
  VERCEL_GITLAB_COMMIT_SHA ||
  VERCEL_BITBUCKET_COMMIT_SHA;

process.env.SENTRY_DSN = SENTRY_DSN;
const basePath = "";

module.exports = withSourceMaps(
  withPWA({
    env: {
      // Make the COMMIT_SHA available to the client so that Sentry events can be
      // marked for the release the belong to. It may be undefined if running
      // outside of Vercel
      NEXT_PUBLIC_COMMIT_SHA: COMMIT_SHA,
    },
    webpack: (config, { isServer, webpack }) => {
      if (!isServer) {
        config.resolve.alias["@sentry/node"] = "@sentry/browser";
      }

      config.plugins.push(
        new webpack.DefinePlugin({
          "process.env.NEXT_IS_SERVER": JSON.stringify(isServer.toString()),
        })
      );

      if (
        SENTRY_DSN &&
        SENTRY_ORG &&
        SENTRY_PROJECT &&
        SENTRY_AUTH_TOKEN &&
        COMMIT_SHA &&
        NODE_ENV === "production"
      ) {
        config.plugins.push(
          new SentryWebpackPlugin({
            include: ".next",
            ignore: ["node_modules"],
            stripPrefix: ["webpack://_N_E/"],
            urlPrefix: `~${basePath}/_next`,
            release: COMMIT_SHA,
          })
        );
      }

      if (isServer) {
        return {
          ...config,
          entry() {
            return config.entry().then((entry) => {
              return Object.assign({}, entry, {
                achievementsCrunch: "./src/serverDb/achievements/index.ts",
              });
            });
          },
        };
      }
      return config;
    },
    pwa: {
      disable: process.env.NODE_ENV === "development",
      dest: "public",
    },
    i18n: {
      locales: ["en", "sv"],
      defaultLocale: "sv",
    },
    async redirects() {
      return [
        routes.Home.sv.redirect,
        routes.Users.sv.redirect,
        routes.UserEdit.sv.redirect,
        routes.UserDetails.sv.redirect,
        routes.Brands.sv.redirect,
        routes.BrandDetails.sv.redirect,
        routes.AddDrink.sv.redirect,
        routes.Rules.sv.redirect,
        routes.LogIn.sv.redirect,
        routes.LogOut.sv.redirect,
        routes.VerifyEmail.sv.redirect,
      ];
    },
    async rewrites() {
      return [
        routes.Home.sv.rewrite,
        routes.Users.sv.rewrite,
        routes.UserEdit.sv.rewrite,
        routes.UserDetails.sv.rewrite,
        routes.Brands.sv.rewrite,
        routes.BrandDetails.sv.rewrite,
        routes.AddDrink.sv.rewrite,
        routes.Rules.sv.rewrite,
        routes.LogIn.sv.rewrite,
        routes.LogOut.sv.rewrite,
        routes.VerifyEmail.sv.rewrite,
      ];
    },
  })
);
