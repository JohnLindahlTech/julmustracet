import React from "react";
import Typography from "@material-ui/core/Typography";
import { FormattedMessage } from "react-intl";
import Users from "../components/users";
import Brands from "../components/brands";

const Home = () => {
  return (
    <main>
      <Typography variant="h1">
        <FormattedMessage defaultMessage="Välkommen till JulmustRacet" />
      </Typography>

      <Typography variant="h6" component="p" color="primary">
        <FormattedMessage defaultMessage="...nu med bedrifter!" />
      </Typography>
      <Typography variant="h2">
        <FormattedMessage defaultMessage="Användarligan" />
      </Typography>
      <Users />
      <Typography variant="h2">
        <FormattedMessage defaultMessage="Märkesligan" />
      </Typography>
      <Brands />
    </main>
  );
};

export default Home;
