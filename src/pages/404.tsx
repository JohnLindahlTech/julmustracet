import React from "react";
import { Box, Typography, Divider, useTheme } from "@material-ui/core";
import { FormattedMessage, useIntl } from "react-intl";
import { PageContent } from "../components/PageContent";
import { HeadTitle } from "../components/HeadTitle";

// TODO Own look and feel.

export default function NotFound(): JSX.Element {
  const intl = useIntl();
  const theme = useTheme();
  // Opinionated: do not record an exception in Sentry for 404
  return (
    <PageContent>
      <HeadTitle
        title={intl.formatMessage({
          defaultMessage: "404 - Kan inte hitta sidan",
        })}
      />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="65vh"
      >
        <Box display="flex" gridGap={theme.spacing(2)} alignItems="center">
          <Typography variant="h4" component="span">
            <FormattedMessage defaultMessage="404" />
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography>
            <FormattedMessage defaultMessage="Kan inte hitta sidan" />
          </Typography>
        </Box>
      </Box>
    </PageContent>
  );
}
