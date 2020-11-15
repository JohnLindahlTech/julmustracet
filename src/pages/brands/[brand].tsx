import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import TopList from "../../components/table/TopList";
import HistoryList from "../../components/table/HistoryList";
import { UserDetails } from "../../routes";
import { BRAND, USER } from "../../lib/mapGraphData";
import Graph from "../../components/graph/Graph";
import { useGetDrinksFrom } from "../../db/useGetDrinks";
import { PageContent } from "../../components/PageContent";
import Error404 from "../404";

const Brand = () => {
  const router = useRouter();
  const { brand } = router.query;
  const { graph, drinks, top, loading } = useGetDrinksFrom(
    BRAND,
    brand as string
  );

  if (!loading && (drinks?.length ?? 0) === 0) {
    return <Error404 />;
  }

  return (
    <>
      <PageContent noPadding>
        <Box p={2}>
          <Typography variant="h1">{loading ? <Skeleton /> : brand}</Typography>
          <Typography variant="h2">
            <FormattedMessage defaultMessage="Graf" />
          </Typography>
        </Box>
        <Graph data={graph} loading={loading} />
      </PageContent>
      <PageContent noPadding>
        <TopList
          loading={loading}
          getDetailsLink={(row) => ({
            pathname: UserDetails.href,
            query: { user: row.name },
          })}
          title={<FormattedMessage defaultMessage="Användare" />}
          rows={top}
        />
      </PageContent>
      <PageContent noPadding>
        <HistoryList
          loading={loading}
          getDetailsLink={(row) => ({
            pathname: UserDetails.href,
            query: { user: row.username },
          })}
          type={USER}
          title={<FormattedMessage defaultMessage="Historik" />}
          rows={drinks}
        />
      </PageContent>
    </>
  );
};

export default Brand;
