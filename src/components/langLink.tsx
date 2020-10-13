import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const LangLink = (props) => {
  const router = useRouter();
  const { href } = props;
  const { lang } = router.query;
  const pathname = typeof href === "string" ? href : href.pathname;
  const query = typeof href === "string" ? {} : href.query;
  return (
    <Link
      {...props}
      href={{
        pathname,
        query: { lang, ...query },
      }}
    />
  );
};

export default LangLink;
