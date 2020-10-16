import { Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";

export {
  getStaticProps,
  getStaticPaths,
} from "../../translations/getStaticPath";

const Rules = () => (
  <>
    <Typography variant="h1">
      <FormattedMessage defaultMessage="Regler" />
    </Typography>
  </>
);

export default Rules;
