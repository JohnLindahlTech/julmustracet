import React from "react";
import { Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import Brands from "../../components/brands";

const BrandsPage = () => (
  <>
    <main>
      <Typography variant="h1">
        <FormattedMessage defaultMessage="Märkesligan" />
      </Typography>
      <Brands />
    </main>
  </>
);

export default BrandsPage;
