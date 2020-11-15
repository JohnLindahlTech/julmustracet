import React from "react";
import Error from "next/error";

// TODO Own look and feel.

export default function NotFound(): JSX.Element {
  // Opinionated: do not record an exception in Sentry for 404
  return <Error statusCode={404} />;
}
