import React from "react";
import { FormattedMessage } from "react-intl";

export {
  getStaticProps,
  getStaticPaths,
} from "../../../translations/getStaticPath";

const Users = () => (
  <>
    <main>
      <h1>
        <FormattedMessage defaultMessage="Användartopplista" />
      </h1>
    </main>
  </>
);

export default Users;
