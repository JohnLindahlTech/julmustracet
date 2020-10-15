import { useRouter } from "next/router";
import getLocalizedHref from "../lib/localized-href";
import { Url } from "../types/url";

const useLangRouter = () => {
  const router = useRouter();
  const { lang } = router.query;

  const push = (url: Url, as?: Url, options?: unknown) => {
    const href = getLocalizedHref(lang as string, url);
    router.push(href, as, options);
  };

  const replace = (url: Url, as?: Url, options?: unknown) => {
    router.replace(url, as, options);
  };

  const localizeHref = (href: Url) => {
    return getLocalizedHref(lang as string, href);
  };

  return {
    ...router,
    push,
    replace,
    getLocalizedHref: localizeHref,
  };
};

export default useLangRouter;
