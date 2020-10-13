/* eslint-disable @typescript-eslint/no-var-requires */
const routes = require("./src/routes");

module.exports = {
  async rewrites() {
    return [
      // routes.Home.sv,
      routes.Users.sv.rewrite,
      routes.UserEdit.sv.rewrite,
      routes.UserDetails.sv.rewrite,
      routes.Brands.sv.rewrite,
      routes.BrandDetails.sv.rewrite,
      routes.AddDrink.sv.rewrite,
      routes.Rules.sv.rewrite,
      routes.LogIn.sv.rewrite,
      routes.LogIn.en.rewrite,
      routes.LogOut.sv.rewrite,
      routes.LogOut.en.rewrite,
    ];
  },
};
