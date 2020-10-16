import React from "react";
import { FormattedMessage } from "react-intl";

export {
  getStaticProps,
  getStaticPaths,
} from "../../../translations/getStaticPath";

const Brands = () => (
  <>
    <main>
      <h1>
        <FormattedMessage defaultMessage="Märkesligan" />
      </h1>
    </main>
  </>
);

export default Brands;
