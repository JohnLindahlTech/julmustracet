// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { warn } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import routes from "../routes";

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

const LangLink = (props) => {
  const router = useRouter();
  const { href } = props;
  let { lang } = router.query;
  const prevPathName = typeof href === "string" ? href : href.pathname;
  let prevQuery = typeof href === "string" ? {} : href.query;
  if (prevQuery?.lang) {
    // If explicitly given a lang, that is what we are interested in.
    lang = prevQuery.lang;
  }
  const localizedPath = findLocalizedPath(lang, prevPathName);
  const pathname = localizedPath || prevPathName;
  if (localizedPath) {
    // If we found a localized pathname, we do not need the lang-param because that is already handled in the path.
    const { lang, ...rest } = prevQuery;
    prevQuery = rest;
  }
  const query = {
    // If we did not find a localized path we need to explicitly give the lang.
    ...(localizedPath ? {} : { lang }),
    ...prevQuery,
  };
  return (
    <Link
      {...props}
      href={{
        pathname,
        query,
      }}
    />
  );
};

export default LangLink;
