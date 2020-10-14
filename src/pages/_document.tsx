import { polyfill } from "../polyfills";
import React from "react";
import Document from "next/document";
import { ServerStyleSheet } from "styled-components";
import { ServerStyleSheets as MUIServerStyleSheets } from "@material-ui/core/styles";

polyfill();

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const muiSheets = new MUIServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore // collectStyles does not exist on sheet: e
            muiSheets.collect(sheet.collectStyles(<App {...props} />)),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            {muiSheets.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
