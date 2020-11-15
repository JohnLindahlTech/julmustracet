import React, { FC } from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { FormattedMessage, useIntl } from "react-intl";
import { Home, LogIn } from "../routes";
import { PageContent } from "../components/PageContent";
import NextLink from "next/link";
import { Link } from "../components/link";
import { HeadTitle } from "../components/HeadTitle";

const Error: FC = () => {
  const intl = useIntl();
  return (
    <PageContent>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <HeadTitle
          title={intl.formatMessage({ defaultMessage: "Inloggningsfel" })}
        />
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
      </Box>
    </PageContent>
  );
};

export default Error;
