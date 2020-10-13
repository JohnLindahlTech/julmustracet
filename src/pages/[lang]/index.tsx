import React from "react";
import { useRouter } from "next/router";

export {
  getStaticProps,
  getStaticPaths,
} from "../../translations/getStaticPath";

const Home = (props) => {
  const router = useRouter();
  return <div>{router.query.lang}</div>;
};

export default Home;
