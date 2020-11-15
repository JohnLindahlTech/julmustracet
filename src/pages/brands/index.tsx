import React from "react";
import { Typography, createStyles, makeStyles, Theme } from "@material-ui/core";
import { FormattedMessage, useIntl } from "react-intl";
import Brands from "../../components/brands";
import { PageContent } from "../../components/PageContent";
import { HeadTitle } from "../../components/HeadTitle";

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    padding: {
      padding: spacing(2),
    },
  })
);

const BrandsPage = () => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <>
      <HeadTitle
        title={intl.formatMessage({ defaultMessage: "Märkesligan" })}
      />
      <PageContent noPadding>
        <Typography className={classes.padding} variant="h1">
          <FormattedMessage defaultMessage="Märkesligan" />
        </Typography>
        <Brands />
      </PageContent>
    </>
  );
};

export default BrandsPage;
