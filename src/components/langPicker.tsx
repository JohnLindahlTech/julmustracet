import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import FlagSV from "./flags/sv";
import FlagUK from "./flags/uk";

const LangPicker = (props) => {
  const router = useRouter();
  const { query, pathname } = router;
  const { lang } = router.query;
  return (
    <Link
      href={{
        pathname,
        query: {
          ...query,
          lang: lang === "sv" ? "en" : "sv",
        },
      }}
    >
      <a>
        {lang === "sv" && <FlagUK />}
        {lang === "en" && <FlagSV />}
      </a>
    </Link>
  );
};

export default LangPicker;
