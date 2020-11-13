import { Typography, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import Users from "../../components/users";
import { PageContent } from "../../components/PageContent";

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    padding: {
      padding: spacing(2),
    },
  })
);

const UsersPage = () => {
  const classes = useStyles();
  return (
    <PageContent noPadding>
      <Typography className={classes.padding} variant="h1">
        <FormattedMessage defaultMessage="Användarligan" />
      </Typography>
      <Users />
    </PageContent>
  );
};

export default UsersPage;
