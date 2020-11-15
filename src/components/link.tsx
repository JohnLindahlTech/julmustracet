import React, { FC } from "react";
import NextLink, { LinkProps } from "next/link";
import { Link as MuiLink } from "@material-ui/core";

export const Link: FC<LinkProps> = ({ children, ...rest }) => {
  return (
    <NextLink {...rest} passHref>
      <MuiLink>{children}</MuiLink>
    </NextLink>
  );
};

export default Link;
