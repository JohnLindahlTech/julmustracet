import React from "react";
import Typography from "@material-ui/core/Typography";
import { FormattedMessage } from "react-intl";

export {
  getStaticProps,
  getStaticPaths,
} from "../../translations/getStaticPath";

const Home = () => {
  return (
    <div>
      <Typography variant="h1">
        <FormattedMessage defaultMessage="Välkommen till JulmustRacet" />
      </Typography>
      <Typography variant="h2">
        <FormattedMessage defaultMessage="Användarligan" />
      </Typography>
      <Typography variant="h2">
        <FormattedMessage defaultMessage="Märkesligan" />
      </Typography>
    </div>
  );
};

export default Home;
