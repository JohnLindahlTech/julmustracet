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
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
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
