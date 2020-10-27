const deploymentPath = "/_next/data/:deployment";

const svLang = "sv";

const usersPath = `users`;
const userPath = "[user]";
const userRegex = ":user";
const svUsersPath = `konsumenter`;

const brandsPath = `brands`;
const brandPath = "[brand]";
const brandRegex = ":brand";
const svBrandsPath = `tillverkare`;

const rules = "rules";
const svRules = "regler";

const edit = "edit";
const svEdit = "redigera";

const add = "add";
const svAdd = "ny";

const login = "login";
const svLogin = "loggain";

const logout = "logout";
const svLogout = "loggaut";

const verifyEmail = "verify-email";
const svVerifyEmail = "verifiera-epost";

module.exports = {
  Error: {
    href: "/_error",
  },
  Home: {
    href: `/`,
    sv: {
      href: "/",
      rewrite: {
        source: `/`,
        destination: `/${svLang}`,
      },
      redirect: {
        source: `${deploymentPath}/index.json`,
        destination: `${deploymentPath}/${svLang}.json`,
        permanent: true,
      },
    },
  },

  Users: {
    href: `/${usersPath}`,
    sv: {
      href: `/${svUsersPath}`,
      rewrite: {
        source: `/${svUsersPath}`,
        destination: `/${svLang}/${usersPath}`,
      },
      redirect: {
        source: `${deploymentPath}/${svUsersPath}.json`,
        destination: `${deploymentPath}/${svLang}/${usersPath}.json`,
        permanent: true,
      },
    },
  },

  UserEdit: {
    href: `/${usersPath}/${edit}`,
    sv: {
      href: `/${svUsersPath}/${svEdit}`,
      rewrite: {
        source: `/${svUsersPath}/${svEdit}`,
        destination: `/${svLang}/${usersPath}/${edit}`,
      },
      redirect: {
        source: `${deploymentPath}/${svUsersPath}/${svEdit}.json`,
        destination: `${deploymentPath}/${svLang}/${usersPath}/${edit}.json`,
        permanent: true,
      },
    },
  },

  UserDetails: {
    href: `/${usersPath}/${userPath}`,
    sv: {
      href: `/${svUsersPath}/${userPath}`,
      rewrite: {
        source: `/${svUsersPath}/${userRegex}`,
        destination: `/${svLang}/${usersPath}/${userRegex}`,
      },
      redirect: {
        source: `${deploymentPath}/${svUsersPath}/${userRegex}.json`,
        destination: `${deploymentPath}/${svLang}/${usersPath}/${userRegex}.json`,
        permanent: true,
      },
    },
  },

  Brands: {
    href: `/${brandsPath}`,
    sv: {
      href: `/${svBrandsPath}`,
      rewrite: {
        source: `/${svBrandsPath}`,
        destination: `/${svLang}/${brandsPath}`,
      },
      redirect: {
        source: `${deploymentPath}/${svBrandsPath}.json`,
        destination: `${deploymentPath}/${svLang}/${brandsPath}.json`,
        permanent: true,
      },
    },
  },

  BrandDetails: {
    href: `/${brandsPath}/${brandPath}`,
    sv: {
      href: `/${svBrandsPath}/${brandPath}`,
      rewrite: {
        source: `/${svBrandsPath}/${brandRegex}`,
        destination: `/${svLang}/${brandsPath}/${brandRegex}`,
      },
      redirect: {
        source: `${deploymentPath}/${svBrandsPath}/${brandRegex}.json`,
        destination: `${deploymentPath}/${svLang}/${brandsPath}/${brandRegex}.json`,
        permanent: true,
      },
    },
  },

  AddDrink: {
    href: `/${add}`,
    sv: {
      href: `/${svAdd}`,
      rewrite: {
        source: `/${svAdd}`,
        destination: `/${svLang}/${add}`,
      },
      redirect: {
        source: `${deploymentPath}/${svAdd}.json`,
        destination: `${deploymentPath}/${svLang}/${add}.json`,
        permanent: true,
      },
    },
  },

  Rules: {
    href: `/${rules}`,
    sv: {
      href: `/${svRules}`,
      rewrite: {
        source: `/${svRules}`,
        destination: `/${svLang}/${rules}`,
      },
      redirect: {
        source: `${deploymentPath}/${svRules}.json`,
        destination: `${deploymentPath}/${svLang}/${rules}.json`,
        permanent: true,
      },
    },
  },

  LogIn: {
    href: `/${login}`,
    sv: {
      href: `/${svLogin}`,
      rewrite: {
        source: `/${svLogin}`,
        destination: `/${svLang}/${login}`,
      },
      redirect: {
        source: `${deploymentPath}/${svLogin}.json`,
        destination: `${deploymentPath}/${svLang}/${login}.json`,
        permanent: true,
      },
    },
  },

  LogOut: {
    href: `/${logout}`,
    sv: {
      href: `/${svLogout}`,
      rewrite: {
        source: `/${svLogout}`,
        destination: `/${svLang}/${logout}`,
      },
      redirect: {
        source: `${deploymentPath}/${svLogout}.json`,
        destination: `${deploymentPath}/${svLang}/${logout}.json`,
        permanent: true,
      },
    },
  },

  VerifyEmail: {
    href: `/${verifyEmail}`,
    sv: {
      href: `/${svVerifyEmail}`,
      rewrite: {
        source: `/${svVerifyEmail}`,
        destination: `/${svLang}/${verifyEmail}`,
      },
      redirect: {
        source: `${deploymentPath}/${svVerifyEmail}.json`,
        destination: `${deploymentPath}/${svLang}/${verifyEmail}.json`,
        permanent: true,
      },
    },
  },
};
