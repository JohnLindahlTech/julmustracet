import React from "react";
import Head from "next/head";
import { getInitialLocale } from "../translations/getInitialLocales";
import { useRouter } from "next/router";

const Index: React.FC = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.replace(`/${getInitialLocale()}`);
  });
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default Index;
