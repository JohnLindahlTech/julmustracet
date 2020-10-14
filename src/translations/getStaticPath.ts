import { GetStaticProps, GetStaticPaths } from "next";
import { EN, SV } from "./config";
// import { getMessages } from "./messages";

export const getStaticProps: GetStaticProps = async (context) => {
  // const { lang } = context.params;
  // const messages = await getMessages(lang);
  return {
    props: {
      // messages,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { lang: SV } }, { params: { lang: EN } }],
    fallback: false,
  };
};
