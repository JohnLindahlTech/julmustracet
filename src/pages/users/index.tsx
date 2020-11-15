import { Typography, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { NextPage } from "next";
import Users from "../../components/users";
import { PageContent } from "../../components/PageContent";
import { HeadTitle } from "../../components/HeadTitle";

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    padding: {
      padding: spacing(2),
    },
  })
);

const UsersPage: NextPage = () => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <>
      <HeadTitle
        title={intl.formatMessage({ defaultMessage: "Användarligan" })}
      />
      <PageContent noPadding>
        <Typography className={classes.padding} variant="h1">
          <FormattedMessage defaultMessage="Användarligan" />
        </Typography>
        <Users />
      </PageContent>
    </>
  );
};

export default UsersPage;
