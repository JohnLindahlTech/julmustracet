import React from "react";
import { Typography, createStyles, makeStyles, Theme } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import Brands from "../../components/brands";
import { PageContent } from "../../components/PageContent";

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    padding: {
      padding: spacing(2),
    },
  })
);

const BrandsPage = () => {
  const classes = useStyles();
  return (
    <PageContent noPadding>
      <Typography className={classes.padding} variant="h1">
        <FormattedMessage defaultMessage="Märkesligan" />
      </Typography>
      <Brands />
    </PageContent>
  );
};

export default BrandsPage;
