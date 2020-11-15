import React, { FC, ReactNode } from "react";
import Head from "next/head";
import { useIntl } from "react-intl";

type HeadTitleProps = {
  title: string | ReactNode;
  root?: boolean;
};

export const HeadTitle: FC<HeadTitleProps> = (props) => {
  const intl = useIntl();
  const { title, root } = props;
  const titleText = root
    ? title
    : intl.formatMessage(
        { defaultMessage: "{title} - JulmustRacet" },
        { title }
      );
  return (
    <Head>
      <title key="title">{titleText}</title>
      <meta name="og:title" key="og:title" content={titleText as string} />
      <meta name="twitter:title" key="og:title" content={titleText as string} />
    </Head>
  );
};
