import React, { FC, MouseEvent } from "react";
import { default as NextLink } from "next/link";
import { Link as MuiLink } from "@material-ui/core";

export type LinkProps = {
  href: string;
  onMouseEnter?: (event: MouseEvent<Element, MouseEvent>) => void;
  onClick?: (event: MouseEvent<Element, MouseEvent>) => void;
  ref?: any;
};

export const Link: FC<LinkProps> = ({ children, ...rest }) => {
  return (
    <NextLink {...rest} passHref>
      <MuiLink>{children}</MuiLink>
    </NextLink>
  );
};

export default Link;
