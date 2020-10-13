export async function getStaticProps() {
  return {
    props: {},
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { lang: "sv" } }, { params: { lang: "en" } }],
    fallback: false,
  };
}
