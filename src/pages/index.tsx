import React, { FC } from "react";
import { Typography, makeStyles, createStyles, Theme } from "@material-ui/core";
import { FormattedMessage, useIntl } from "react-intl";
import Users from "../components/users";
import Brands from "../components/brands";
import { PageContent } from "../components/PageContent";
import { HeadTitle } from "../components/HeadTitle";

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    padding: {
      padding: spacing(2),
    },
  })
);

const Home: FC = () => {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <>
      <HeadTitle
        root
        title={intl.formatMessage({ defaultMessage: "JulmustRacet" })}
      />
      <PageContent>
        <Typography variant="h1">
          <FormattedMessage defaultMessage="Välkommen till JulmustRacet" />
        </Typography>

        <Typography variant="h6" component="p" color="primary">
          <FormattedMessage defaultMessage="...nu med utmärkelser!" />
        </Typography>
      </PageContent>
      <PageContent noPadding>
        <Typography variant="h2" className={classes.padding}>
          <FormattedMessage defaultMessage="Användarligan" />
        </Typography>
        <Users />
      </PageContent>
      <PageContent noPadding>
        <Typography variant="h2" className={classes.padding}>
          <FormattedMessage defaultMessage="Märkesligan" />
        </Typography>
        <Brands />
      </PageContent>
    </>
  );
};

export default Home;
