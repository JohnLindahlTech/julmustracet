import React, { useCallback } from "react";
import { signOut } from "next-auth/client";
import { Button, Box, Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { Home } from "../routes";
import withEnsuredSession from "../hocs/withEnsuredSession";
import { useSessionDB } from "../db/sessionDB";

const LogOut = (props) => {
  const sessionDB = useSessionDB();

  const onSignoutClick = useCallback(
    async (e) => {
      e.preventDefault();
      await sessionDB.destroy();
      signOut({ callbackUrl: Home.href });
    },
    [sessionDB]
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography>
        <FormattedMessage defaultMessage="Är du säker på att du vill logga ut?" />
      </Typography>
      <Box padding={2}>
        <Button color="primary" variant="contained" onClick={onSignoutClick}>
          <FormattedMessage defaultMessage="Logga ut" />
        </Button>
      </Box>
    </Box>
  );
};

export default withEnsuredSession()(LogOut);
