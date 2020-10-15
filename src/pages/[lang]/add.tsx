import React from "react";
import { FormattedMessage } from "react-intl";
import withEnsuredSession from "../../hocs/withEnsuredSession";

export {
  getStaticProps,
  getStaticPaths,
} from "../../translations/getStaticPath";

const Add = () => (
  <>
    <main>
      <h1>
        <FormattedMessage defaultMessage="Lägg till dryck" />
      </h1>
    </main>
  </>
);

export default withEnsuredSession()(Add);
