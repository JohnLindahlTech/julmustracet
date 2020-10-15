import React from "react";
import { FormattedMessage } from "react-intl";

export {
  getStaticProps,
  getStaticPaths,
} from "../../translations/getStaticPath";

const VerifyRequest = () => (
  <>
    <main>
      <h1>
        <FormattedMessage defaultMessage="Kontrollera din epost för inloggningslänk" />
      </h1>
    </main>
  </>
);

export default VerifyRequest;
