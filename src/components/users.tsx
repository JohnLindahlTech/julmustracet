import React from "react";
import { FormattedMessage } from "react-intl";
import { useGetDrinks } from "../db/useGetDrinks";
import { USER } from "../lib/mapGraphData";
import { UserDetails } from "../routes";
import Graph from "./graph/Graph";
import TopList from "./table/TopList";

const Users = () => {
  const { graph, grid } = useGetDrinks(USER);

  return (
    <>
      <Graph data={graph.slice(0, 5)} />
      <TopList
        getDetailsLink={(row) => ({
          pathname: UserDetails.href,
          query: { user: row.name },
        })}
        title={<FormattedMessage defaultMessage="Användare" />}
        rows={grid}
      />
    </>
  );
};

export default Users;
