/* eslint-disable @typescript-eslint/no-var-requires */
const routes = require("./src/routes");
const withPWA = require("next-pwa");

module.exports = withPWA({
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
});
