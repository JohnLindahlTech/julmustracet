import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useGetDrinks } from "../db/useGetDrinks";
import { BRAND } from "../lib/mapGraphData";
import { BrandDetails } from "../routes";
import Graph from "./graph/Graph";
import TopList from "./table/TopList";

const Brands: FC = () => {
  const { graph, grid, loading } = useGetDrinks(BRAND);

  return (
    <>
      <Graph loading={loading} data={graph.slice(0, 5)} />
      <TopList
        loading={loading}
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
