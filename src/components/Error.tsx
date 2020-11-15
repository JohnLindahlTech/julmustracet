import React from "react";
import { Box, Typography, Divider, useTheme } from "@material-ui/core";
import { PageContent } from "../components/PageContent";

type ErrorProps = {
  title: JSX.Element | string | number;
  statusCode: JSX.Element | string;
  outsideOfLayout?: boolean;
};

export default function Error({
  title,
  statusCode,
  outsideOfLayout,
}: ErrorProps): JSX.Element {
  const theme = useTheme();
  return (
    <PageContent
      noPadding
      noMargin
      minHeight={outsideOfLayout ? "100vh" : undefined}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight={outsideOfLayout ? "100vh" : "65vh"}
      >
        <Box display="flex" gridGap={theme.spacing(2)} alignItems="center">
          <Typography variant="h4" component="span">
            {statusCode}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography>{title}</Typography>
        </Box>
      </Box>
    </PageContent>
  );
}
