import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { Url } from "../types/url";
import useEnsureSessionState, { LOGGED_OUT } from "../hooks/useEnsureSession";

const withEnsuredSession = (href?: Url, sessionState?: boolean) => (Child) => {
  const EnsuredLoggedIn = (props) => {
    const { staticBuilding } = props;

    const [approved] = useEnsureSessionState(href, sessionState);
    if (approved || (staticBuilding && sessionState === LOGGED_OUT)) {
      return <Child />;
    }
    return <></>;
  };

  EnsuredLoggedIn.displayName = `withEnsuredSession(${Child.displayName}, ${
    sessionState ? "Logged in" : "Logged out"
  })`;

  hoistNonReactStatics(EnsuredLoggedIn, Child);

  return EnsuredLoggedIn;
};

export default withEnsuredSession;
