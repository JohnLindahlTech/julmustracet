import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import useGetDrinks from "../db/useGetDrinks";
import mapGraphData from "../lib/mapGraphData";
import mapGridData from "../lib/mapGridData";
import { UserDetails } from "../routes";
import Graph from "./graph/Graph";
import TopList from "./table/TopList";

const Users = () => {
  const [graphData, setGraphData] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [drinks] = useGetDrinks();
  useEffect(() => {
    const res = mapGraphData(drinks);
    setGraphData(res);
    setGridData(mapGridData(res));
  }, [drinks]);

  return (
    <>
      <Graph data={graphData.slice(0, 5)} />
      <TopList
        getDetailsLink={(row) => ({
          pathname: UserDetails.href,
          query: { user: row.name },
        })}
        title={<FormattedMessage defaultMessage="Användare" />}
        rows={gridData}
      />
    </>
  );
};

export default Users;
