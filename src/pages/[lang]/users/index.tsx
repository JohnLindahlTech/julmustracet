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
        <FormattedMessage defaultMessage="Användarligan" />
      </h1>
    </main>
  </>
);

export default Users;
