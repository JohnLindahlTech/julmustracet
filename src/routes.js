const root = "[lang]";
const svLang = "sv";

const userPath = `users`;
const svUserPath = `konsumenter`;

const brandPath = `brands`;
const svBrandPath = `tillverkare`;

const authAPI = `/api/auth`;

module.exports = {
  Home: {
    href: `/${root}`,
  },

  Users: {
    href: `/${root}/${userPath}`,
    sv: {
      href: `/${svUserPath}`,
      rewrite: {
        source: `/${svUserPath}`,
        destination: `/${svLang}/${userPath}`,
      },
    },
  },

  UserEdit: {
    href: `/${root}/${userPath}/edit`,
    sv: {
      href: `/${svUserPath}/redigera`,
      rewrite: {
        source: `/${svUserPath}/redigera`,
        destination: `/${svLang}/${userPath}/edit`,
      },
    },
  },

  UserDetails: {
    href: `/${root}/${userPath}/[user]`,
    sv: {
      href: `/${svUserPath}/[user]`,
      rewrite: {
        source: `/${svUserPath}/:user`,
        destination: `/${svLang}/${userPath}/:user`,
      },
    },
  },

  Brands: {
    href: `/${root}/${brandPath}`,
    sv: {
      href: `/${svBrandPath}`,
      rewrite: {
        source: `/${svBrandPath}`,
        destination: `/${svLang}/${brandPath}`,
      },
    },
  },

  BrandDetails: {
    href: `/${root}/${brandPath}/[brand]`,
    sv: {
      href: `/${svBrandPath}/[brand]`,
      rewrite: {
        source: `/${svBrandPath}/:brand`,
        destination: `/${svLang}/${brandPath}/:brand`,
      },
    },
  },

  AddDrink: {
    href: `${root}/add`,
    sv: {
      href: `/ny`,
      rewrite: {
        source: `/ny`,
        destination: `/${svLang}/add`,
      },
    },
  },

  Rules: {
    href: `${root}/rules`,
    sv: {
      href: `/regler`,
      rewrite: {
        source: `/regler`,
        destination: `/${svLang}/rules`,
      },
    },
  },

  LogIn: {
    href: `${authAPI}/signin`,
    sv: {
      href: `/loggain`,
      rewrite: {
        source: `/loggain`,
        destination: `${authAPI}/signin`,
      },
    },
    en: {
      href: `/login`,
      rewrite: {
        source: `/login`,
        destination: `${authAPI}/signin`,
      },
    },
  },

  LogOut: {
    href: `${authAPI}/signout`,
    sv: {
      href: `/loggaut`,
      rewrite: {
        source: `/loggaut`,
        destination: `${authAPI}/signin`,
      },
    },
    en: {
      href: `/logout`,
      rewrite: {
        source: `/logout`,
        destination: `${authAPI}/signin`,
      },
    },
  },
};
