import React, { FC, MouseEvent } from "react";
import { LinkProps } from "next/link";
import LangLink from "./langLink";
import { Link as MuiLink } from "@material-ui/core";

export const Link: FC<LinkProps> = ({ children, ...rest }) => {
  return (
    <LangLink {...rest} passHref>
      <MuiLink>{children}</MuiLink>
    </LangLink>
  );
};

export default Link;
