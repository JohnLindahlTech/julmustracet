import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { HeadTitle } from "../components/HeadTitle";
import Error from "../components/Error";

// TODO Own look and feel.

export default function NotFound(): JSX.Element {
  const intl = useIntl();
  // Opinionated: do not record an exception in Sentry for 404
  return (
    <>
      <HeadTitle
        title={intl.formatMessage({
          defaultMessage: "404 - Kan inte hitta sidan",
        })}
      />
      <Error
        statusCode={<FormattedMessage defaultMessage="404" />}
        title={<FormattedMessage defaultMessage="Kan inte hitta sidan" />}
      />
    </>
  );
}
