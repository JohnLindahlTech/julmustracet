import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import useGetDrinks from "../db/useGetDrinks";
import mapGraphData, { BRAND } from "../lib/mapGraphData";
import mapGridData from "../lib/mapGridData";
import { BrandDetails } from "../routes";
import Graph from "./graph/Graph";
import TopList from "./table/TopList";

const Brands = () => {
  const [graphData, setGraphData] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [drinks] = useGetDrinks();

  useEffect(() => {
    const res = mapGraphData(drinks, BRAND);
    setGraphData(res);
    setGridData(mapGridData(res));
  }, [drinks]);

  return (
    <>
      <Graph data={graphData.slice(0, 5)} />
      <TopList
        getDetailsLink={(row) => ({
          pathname: BrandDetails.href,
          query: { brand: row.name },
        })}
        title={<FormattedMessage defaultMessage="Märken" />}
        rows={gridData}
      />
    </>
  );
};

export default Brands;
