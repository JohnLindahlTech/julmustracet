import React, { useCallback } from "react";
import { signOut } from "next-auth/client";
import { Button } from "@material-ui/core";
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
    <div>
      <Button onClick={onSignoutClick}>
        <FormattedMessage defaultMessage="Logga ut" />
      </Button>
    </div>
  );
};

export default withEnsuredSession()(LogOut);
