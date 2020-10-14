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
      redirect: {
        source: `/_next/data/:deployment/${svUserPath}.json`,
        destination: `/_next/data/:deployment/${svLang}/${userPath}.json`,
        permanent: true,
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
      redirect: {
        source: `/_next/data/:deployment/${svUserPath}/redigera.json`,
        destination: `/_next/data/:deployment/${svLang}/${userPath}/edit.json`,
        permanent: true,
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
      redirect: {
        source: `/_next/data/:deployment/${svUserPath}/:user.json`,
        destination: `/_next/data/:deployment/${svLang}/${userPath}/:user.json`,
        permanent: true,
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
      redirect: {
        source: `/_next/data/:deployment/${svBrandPath}.json`,
        destination: `/_next/data/:deployment/${svLang}/${brandPath}.json`,
        permanent: true,
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
      redirect: {
        source: `/_next/data/:deployment/${svBrandPath}/:brand.json`,
        destination: `/_next/data/:deployment/${svLang}/${brandPath}/:brand.json`,
        permanent: true,
      },
    },
  },

  AddDrink: {
    href: `/${root}/add`,
    sv: {
      href: `/ny`,
      rewrite: {
        source: `/ny`,
        destination: `/${svLang}/add`,
      },
      redirect: {
        source: `/_next/data/:deployment/ny.json`,
        destination: `/_next/data/:deployment/${svLang}/add.json`,
        permanent: true,
      },
    },
  },

  Rules: {
    href: `/${root}/rules`,
    sv: {
      href: `/regler`,
      rewrite: {
        source: `/regler`,
        destination: `/${svLang}/rules`,
      },
      redirect: {
        source: `/_next/data/:deployment/regler.json`,
        destination: `/_next/data/:deployment/${svLang}/rules.json`,
        permanent: true,
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
