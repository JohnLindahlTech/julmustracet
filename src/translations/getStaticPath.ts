import { GetStaticProps, GetStaticPaths } from "next";
import { EN, SV } from "./config";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { lang: SV } }, { params: { lang: EN } }],
    fallback: false,
  };
};
