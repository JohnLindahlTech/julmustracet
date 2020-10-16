import React from "react";
import { Divider, Typography, useTheme } from "@material-ui/core";
import { Github as GithubIcon } from "@styled-icons/fa-brands/Github";

const Footer = () => {
  const theme = useTheme();
  return (
    <div style={{ height: 1000 }}>
      <Divider />
      <Typography>© JohnPhoto ({new Date().getFullYear()})</Typography>
      <a
        href="https://github.com/JohnPhoto/julmustracet"
        target="_blank"
        rel="noreferrer noopener"
      >
        <GithubIcon size={theme.spacing(4)} />
      </a>
      <Typography></Typography>
    </div>
  );
};

export default Footer;
