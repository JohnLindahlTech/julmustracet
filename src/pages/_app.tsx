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
import { DateFormatProvider } from "../translations/DateFormatterProvider";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import getDateFnsLocale from "../translations/date-fns-locale";

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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider session={session}>
          <IntlProvider
            locale={locale}
            defaultLocale={defaultLocale}
            messages={messages}
          >
            <DateFormatProvider locale={locale}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateLocale}>
                <DBProvider
                  local={isBrowser ? "julmustracet" : null}
                  remote="http://localhost:3000/api/db/julmustracet"
                >
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </DBProvider>
              </MuiPickersUtilsProvider>
            </DateFormatProvider>
          </IntlProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
