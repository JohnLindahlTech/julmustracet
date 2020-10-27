import { Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import Users from "../../components/users";

const UsersPage = () => {
  return (
    <>
      <main>
        <Typography variant="h1">
          <FormattedMessage defaultMessage="Användarligan" />
        </Typography>
        <Users />
      </main>
    </>
  );
};

export default UsersPage;
