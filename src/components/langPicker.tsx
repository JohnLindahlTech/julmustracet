import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "./langLink";
import FlagSV from "./flags/sv";
import FlagUK from "./flags/uk";
import { setLocale } from "../translations/localStorage";

const LangPicker = () => {
  const router = useRouter();
  const { query, pathname } = router;
  const { lang } = router.query;
  const newLang = lang === "sv" ? "en" : "sv";

  const onLocaleChange = useCallback(() => {
    setLocale(newLang);
  }, [newLang]);
  return (
    <Link
      href={{
        pathname,
        query: {
          ...query,
          lang: newLang,
        },
      }}
    >
      <a onClick={onLocaleChange}>
        {lang === "sv" && <FlagUK />}
        {lang === "en" && <FlagSV />}
      </a>
    </Link>
  );
};

export default LangPicker;
