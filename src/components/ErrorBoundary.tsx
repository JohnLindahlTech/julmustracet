import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import * as Sentry from "@sentry/node";
import Error from "./Error";

export default class ErrorBoundary extends Component<
  { outsideOfLayout?: boolean },
  { hasError: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo): void {
    // You can also log the error to an error reporting service
    Sentry.captureException(error);
    console.error(error);
  }

  render(): JSX.Element {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Error
          outsideOfLayout={this.props.outsideOfLayout}
          title={
            <FormattedMessage defaultMessage="Något gick väldigt tokigt" />
          }
          statusCode={<FormattedMessage defaultMessage="FEL" />}
        />
      );
    }

    return <>{this.props.children}</>;
  }
}
