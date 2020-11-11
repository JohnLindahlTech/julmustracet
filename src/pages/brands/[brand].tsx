import React from "react";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import TopList from "../../components/table/TopList";
import HistoryList from "../../components/table/HistoryList";
import { UserDetails } from "../../routes";
import { BRAND, USER } from "../../lib/mapGraphData";
import Graph from "../../components/graph/Graph";
import { useGetDrinksFrom } from "../../db/useGetDrinks";

const Brand = () => {
  const router = useRouter();
  const { brand } = router.query;
  const { graph, drinks, top } = useGetDrinksFrom(BRAND, brand as string);

  return (
    <>
      <main>
        <Typography variant="h1">{brand}</Typography>
        <Typography variant="h2">
          <FormattedMessage defaultMessage="Graf" />
        </Typography>
        <Graph data={graph} />
        <TopList
          getDetailsLink={(row) => ({
            pathname: UserDetails.href,
            query: { user: row.name },
          })}
          title={<FormattedMessage defaultMessage="Användare" />}
          rows={top}
        />
        <HistoryList
          getDetailsLink={(row) => ({
            pathname: UserDetails.href,
            query: { user: row.username },
          })}
          type={USER}
          title={<FormattedMessage defaultMessage="Historik" />}
          rows={drinks}
        />
      </main>
    </>
  );
};

export default Brand;
