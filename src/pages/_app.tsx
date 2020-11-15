import { init } from "../lib/sentry";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "next-auth/client";
import CssBaseline from "@material-ui/core/CssBaseline";
import { IntlProvider } from "react-intl";
import Layout from "../components/layout";
import { getMessages } from "../translations/messages";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import Head from "next/head";
import DBProvider from "../db/provider";
import { DataProvider } from "../db/data";
import { SessionDBProvider } from "../db/sessionDB";
import { OfflineSessionProvider } from "../db/useOfflineSession";
import { DateFormatProvider } from "../translations/DateFormatterProvider";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import getDateFnsLocale from "../translations/date-fns-locale";
import fetchIntercept from "fetch-intercept";
import { LogIn } from "../routes";
import PouchDB from "pouchdb";

init();

if (typeof window !== "undefined") {
  const unregister = fetchIntercept.register({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response: async (response): Promise<Response> => {
      // TODO Handle every !response.ok here? Probably not...
      // TODO CouchDB only answers with 403
      if (response.status === 401) {
        await new PouchDB("_local/session").destroy();
        window.location.href = LogIn.href;
      }
      return response;
    },
  });
}

const App = ({ Component, pageProps }) => {
  const isBrowser = typeof window !== "undefined";
  const router = useRouter();
  const { defaultLocale, locale = defaultLocale } = router;
  const { session } = pageProps;
  const messages = getMessages(locale);
  const dateLocale = getDateFnsLocale(locale);
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title key="title">JulmustRacet</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider options={{ clientMaxAge: 5 }} session={session}>
          <IntlProvider
            locale={locale}
            defaultLocale={defaultLocale}
            messages={messages}
          >
            <DateFormatProvider locale={locale}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateLocale}>
                <SessionDBProvider
                  name={isBrowser ? "session" : null}
                  session={session}
                >
                  <OfflineSessionProvider>
                    <DBProvider
                      local={isBrowser ? "julmustracet" : null}
                      remote="http://localhost:3000/api/db/julmustracet"
                    >
                      <DataProvider>
                        <Layout>
                          <Component {...pageProps} />
                        </Layout>
                      </DataProvider>
                    </DBProvider>
                  </OfflineSessionProvider>
                </SessionDBProvider>
              </MuiPickersUtilsProvider>
            </DateFormatProvider>
          </IntlProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
