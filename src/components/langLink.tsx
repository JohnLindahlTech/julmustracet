import React from "react";
import Link from "next/link";
import useLangRouter from "../hooks/useLangRouter";

const LangLink = (props) => {
  const router = useLangRouter();
  const { href, locale } = props;
  const newHref = router.getLocalizedHref(href, locale);
  return <Link {...props} href={newHref} />;
};

export default LangLink;
