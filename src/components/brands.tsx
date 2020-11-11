import React from "react";
import { FormattedMessage } from "react-intl";
import { useGetDrinks } from "../db/useGetDrinks";
import { BRAND } from "../lib/mapGraphData";
import { BrandDetails } from "../routes";
import Graph from "./graph/Graph";
import TopList from "./table/TopList";

const Brands = () => {
  const { graph, grid } = useGetDrinks(BRAND);

  return (
    <>
      <Graph data={graph.slice(0, 5)} />
      <TopList
        getDetailsLink={(row) => ({
          pathname: BrandDetails.href,
          query: { brand: row.name },
        })}
        title={<FormattedMessage defaultMessage="Märken" />}
        rows={grid}
      />
    </>
  );
};

export default Brands;
