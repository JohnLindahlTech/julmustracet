import React from "react";
import { FormattedMessage } from "react-intl";

const NextAuth = () => (
  <>
    <main>
      <h1>
        <FormattedMessage defaultMessage="JulmustRacet" />
      </h1>
      <p>
        <FormattedMessage defaultMessage="Användartopplista" />
      </p>
      <p>
        <FormattedMessage defaultMessage="Märkestopplista" />
      </p>
    </main>
  </>
);

export default NextAuth;
