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
  const prevPathName = typeof href === "string" ? href : href.pathname;
  const query = typeof href === "string" ? {} : href.query;

  const localizedPath =
    process.env.NODE_ENV === "production"
      ? findLocalizedPath(locale, prevPathName)
      : prevPathName;
  const pathname = localizedPath || prevPathName;

  return {
    pathname,
    query,
  };
};

export default getLocalizedHref;
