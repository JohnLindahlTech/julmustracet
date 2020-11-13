import React, { FC } from "react";
import {
  Divider,
  Typography,
  useTheme,
  Link as MuiLink,
  Box,
} from "@material-ui/core";
import { Github as GithubIcon } from "@styled-icons/fa-brands/Github";
import { FormattedMessage } from "react-intl";

const Footer: FC = () => {
  const theme = useTheme();
  return (
    <>
      <Box my={2}>
        <Divider variant="fullWidth" />
      </Box>
      <Box m={2}>
        <MuiLink
          href="https://github.com/JohnPhoto/julmustracet"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Typography>
            <FormattedMessage
              defaultMessage="{icon} JohnPhoto/JulmustRacet"
              values={{
                icon: <GithubIcon size={theme.spacing(2)} />,
              }}
            />
          </Typography>
        </MuiLink>
      </Box>
    </>
  );
};

export default Footer;
