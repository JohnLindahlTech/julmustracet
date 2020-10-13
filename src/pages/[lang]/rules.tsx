import React from "react";
import { FormattedMessage } from "react-intl";

export {
  getStaticProps,
  getStaticPaths,
} from "../../translations/getStaticPath";

const Rules = () => (
  <>
    <main>
      <h1>
        <FormattedMessage defaultMessage="Regler" />
      </h1>
    </main>
  </>
);

export default Rules;
