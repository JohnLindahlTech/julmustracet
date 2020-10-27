import { useRouter } from "next/router";
import getLocalizedHref from "../lib/localized-href";
import { Url } from "../types/url";

type Options = {
  locale?: string;
};

const useLangRouter = () => {
  const router = useRouter();
  const { locale: routerLocale } = router;

  const push = (url: Url, as?: Url, options: Options = {}) => {
    const { locale = routerLocale } = options;
    const href = getLocalizedHref(locale, url);
    router.push(href, as, options);
  };

  const replace = (url: Url, as?: Url, options: Options = {}) => {
    const { locale = routerLocale } = options;
    const href = getLocalizedHref(locale, url);
    router.replace(href, as, options);
  };

  const localizeHref = (href: Url, locale = routerLocale) => {
    return getLocalizedHref(locale, href);
  };

  return {
    ...router,
    push,
    replace,
    getLocalizedHref: localizeHref,
  };
};

export default useLangRouter;
