import React, { FC, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "./langLink";
import { setLocale } from "../translations/localStorage";
import { EN, SV } from "../translations/config";
import LangPickerIcon from "./LangPickerIcon";
import { Locale } from "../translations/types";

const LangPicker: FC = () => {
  const router = useRouter();
  const { query, pathname } = router;
  const { lang } = router.query as { lang: Locale };
  const newLang = lang === SV ? EN : SV;

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
        <LangPickerIcon lang={lang} />
      </a>
    </Link>
  );
};

export default LangPicker;
