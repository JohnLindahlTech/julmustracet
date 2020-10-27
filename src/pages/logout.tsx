import React, { useCallback } from "react";
import { signOut } from "next-auth/client";
import { Button } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { Home } from "../routes";
import withEnsuredSession from "../hocs/withEnsuredSession";

const LogOut = (props) => {
  const onSignoutClick = useCallback((e) => {
    e.preventDefault();
    signOut({ callbackUrl: Home.href });
  }, []);

  return (
    <div>
      <Button onClick={onSignoutClick}>
        <FormattedMessage defaultMessage="Logga ut" />
      </Button>
    </div>
  );
};

export default withEnsuredSession()(LogOut);
