import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import TopList from "../../components/table/TopList";
import HistoryList from "../../components/table/HistoryList";
import { UserDetails } from "../../routes";
import { BRAND, USER } from "../../lib/mapGraphData";
import Graph from "../../components/graph/Graph";
import { useGetDrinksFrom } from "../../db/useGetDrinks";
import { PageContent } from "../../components/PageContent";

const Brand = () => {
  const router = useRouter();
  const { brand } = router.query;
  const { graph, drinks, top } = useGetDrinksFrom(BRAND, brand as string);

  return (
    <>
      <PageContent noPadding>
        <Box p={2}>
          <Typography variant="h1">{brand}</Typography>
          <Typography variant="h2">
            <FormattedMessage defaultMessage="Graf" />
          </Typography>
        </Box>
        <Graph data={graph} />
      </PageContent>
      <PageContent noPadding>
        <TopList
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
