import React from "react";
import Link from "next/link";
import useLangRouter from "../hooks/useLangRouter";

const LangLink = (props) => {
  const router = useLangRouter();
  const { href } = props;
  const newHref = router.getLocalizedHref(href);
  return <Link {...props} href={newHref} />;
};

export default LangLink;
