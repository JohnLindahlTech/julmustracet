import routes from "../routes";
import { Url, UrlObject } from "../types/url";

const findLocalizedPath = (locale, href) => {
  const [routeKey] =
    Object.entries(routes).find(([, r]) => r.href === href) || [];
  if (!routeKey) {
    console.warn(`Did not find the route: ${href}
    Remember not to inline the lang.
    Please use the routes defined in src/routes.js (with custom query)`);
  }
  const localizedHref = routes[routeKey]?.[locale]?.href;
  return localizedHref;
};

const getLocalizedHref = (locale: string, href: Url): UrlObject => {
  let lang = locale;
  const prevPathName = typeof href === "string" ? href : href.pathname;
  let prevQuery = (typeof href === "string" ? {} : href.query) as {
    lang?: string;
  };

  if (prevQuery?.lang) {
    // If explicitly given a lang, that is what we are interested in.
    lang = prevQuery.lang as string;
  }
  const localizedPath = findLocalizedPath(lang, prevPathName);
  const pathname = localizedPath || prevPathName;
  if (localizedPath) {
    // If we found a localized pathname, we do not need the lang-param because that is already handled in the path.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { lang: noUsed, ...rest } = prevQuery;
    prevQuery = rest;
  }
  const query = {
    // If we did not find a localized path we need to explicitly give the lang.
    ...(localizedPath ? {} : { lang }),
    ...prevQuery,
  };

  return {
    pathname,
    query,
  };
};

export default getLocalizedHref;
