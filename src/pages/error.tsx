import React, { FC } from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { Home, LogIn } from "../routes";
import { PageContent } from "../components/PageContent";
import NextLink from "next/link";
import { Link } from "../components/link";

const Error: FC = () => {
  return (
    <PageContent>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h1">
          <FormattedMessage defaultMessage="Hoppsan!" />
        </Typography>
        <Typography>
          <FormattedMessage defaultMessage="Något gick visst väldigt fel med inloggningen. Prova gärna igen på länken nedan." />
        </Typography>
        <Box m={1}>
          <NextLink {...LogIn} passHref>
            <Button color="primary" variant="contained">
              <FormattedMessage defaultMessage="Logga in" />
            </Button>
          </NextLink>
        </Box>
        <Box m={1}>
          <Typography>
            <Link {...Home}>
              <FormattedMessage defaultMessage="Gå till startsidan" />
            </Link>
          </Typography>
        </Box>
      </Box>
    </PageContent>
  );
};

export default Error;
