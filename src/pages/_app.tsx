import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "next-auth/client";
import CssBaseline from "@material-ui/core/CssBaseline";
import { IntlProvider } from "react-intl";
import Layout from "../components/layout";
import { getMessages } from "../translations/messages";
import { getLocale } from "../translations/getLocales";
import { defaultLocale } from "../translations/config";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const { session } = pageProps;
  const { lang } = router.query;
  const messages = getMessages(lang);
  const locale = getLocale(lang as string);

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
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </IntlProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
