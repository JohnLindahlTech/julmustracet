import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { Card, CardContent, Grid } from "@material-ui/core";
import TopList from "../../components/table/TopList";
import { UserDetails } from "../../routes";
import mapGridData from "../../lib/mapGridData";
import mapGraphData from "../../lib/mapGraphData";
import generateMockData from "../../lib/generateMockData";
import Graph from "../../components/graph/Graph";

const Brand = () => {
  const router = useRouter();
  const { brand } = router.query;

  const [graphData, setGraphData] = useState([]);
  const [gridData, setGridData] = useState([]);
  useEffect(() => {
    const res = mapGraphData(generateMockData());
    setGraphData(res);
    setGridData(mapGridData(res));
  }, []);

  return (
    <>
      <main>
        <Typography variant="h1">{brand}</Typography>
        <Typography variant="h2">
          <FormattedMessage defaultMessage="Graf" />
        </Typography>
        <Graph data={graphData.slice(0, 1)} />
        <TopList
          getDetailsLink={(row) => ({
            pathname: UserDetails.href,
            query: { user: row.name },
          })}
          title={<FormattedMessage defaultMessage="Historik" />}
          rows={gridData}
        />
      </main>
    </>
  );
};

export default Brand;
