import { polyfill } from "../polyfills";
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets as MUIServerStyleSheets } from "@material-ui/core/styles";
import theme from "../theme";

polyfill();

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="application-name" content="JulmustRacet" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="JulmustRacet" />
          <meta name="description" content="Den legendariska Decemberleken." />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta
            name="msapplication-TileColor"
            content={theme.palette.primary.main}
          />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content={theme.palette.primary.main} />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/safari-pinned-tab.svg"
            color={theme.palette.primary.main}
          />
          <link rel="shortcut icon" href="/favicon.ico" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />

          <meta name="twitter:card" content="summary" />
          <meta
            name="twitter:title"
            key="twitter:title"
            content="JulmustRacet"
          />
          <meta
            name="twitter:description"
            content="Den legendariska Decemberleken."
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" key="og:title" content="JulmustRacet" />
          <meta
            property="og:description"
            content="Den legendariska Decemberleken."
          />
          <meta property="og:site_name" content="JulmustRacet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
  static async getInitialProps(ctx) {
    const muiSheets = new MUIServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore // collectStyles does not exist on sheet: e
          muiSheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {muiSheets.getStyleElement()}
        </>
      ),
    };
  }
}
