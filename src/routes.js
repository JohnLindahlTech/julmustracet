const usersPath = `users`;
const userPath = "[user]";
const brandsPath = `brands`;
const brandPath = "[brand]";
const rules = "rules";
const edit = "edit";
const add = "add";
const login = "login";
const logout = "logout";
const verifyEmail = "verify-email";
const error = "error";

module.exports = {
  NextError: {
    href: "/_error",
  },
  Home: {
    href: `/`,
  },

  Users: {
    href: `/${usersPath}`,
  },

  UserEdit: {
    href: `/${usersPath}/${edit}`,
  },

  UserDetails: {
    href: `/${usersPath}/${userPath}`,
  },

  Brands: {
    href: `/${brandsPath}`,
  },

  BrandDetails: {
    href: `/${brandsPath}/${brandPath}`,
  },

  AddDrink: {
    href: `/${add}`,
  },

  Rules: {
    href: `/${rules}`,
  },

  LogIn: {
    href: `/${login}`,
  },

  LogOut: {
    href: `/${logout}`,
  },

  VerifyEmail: {
    href: `/${verifyEmail}`,
  },

  AuthError: {
    href: `/${error}`,
  },
};
