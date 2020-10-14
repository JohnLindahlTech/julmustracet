import React from "react";
import { useRouter } from "next/router";
import { Provider } from "next-auth/client";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { IntlProvider } from "react-intl";
import Layout from "../components/layout";
import { getMessages } from "../translations/messages";
import { getLocale } from "../translations/getLocales";
import { EN, SV } from "../translations/config";
import { GetStaticPaths, GetStaticProps } from "next";

const GlobalStyle = createGlobalStyle`
body {
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  line-height: 1.4rem;
  padding: 0;
  max-width: 680px;
  margin: 0 auto;
  color: #333;
}

h1 {
  margin: 0 0 2rem 0;
  font-size: 2.5rem;
  line-height: 3rem;
  font-weight: 300;
}

h4 {
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

a {
  font-weight: 500;
}

hr {
  border: 1px solid #ddd;
}

`;
const theme = {
  colors: {
    primary: "#0070f3",
  },
};

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const { session } = pageProps;
  const { lang } = router.query;
  const messages = getMessages(lang);
  const locale = getLocale(lang as string);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider session={session}>
          <IntlProvider locale={locale} defaultLocale={SV} messages={messages}>
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
