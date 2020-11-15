import React from "react";
import { Box, Divider } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { FormattedMessage } from "react-intl";
import { useGetDrinks } from "../db/useGetDrinks";
import { USER } from "../lib/mapGraphData";
import { UserDetails } from "../routes";
import Graph from "./graph/Graph";
import TopList from "./table/TopList";

const Users = () => {
  const { graph, grid, loading } = useGetDrinks(USER);
  return (
    <>
      <Graph loading={loading} data={graph.slice(0, 5)} />
      <Box pt={2}>
        <Divider variant="fullWidth" />
      </Box>
      <TopList
        loading={loading}
        getDetailsLink={(row) => ({
          pathname: UserDetails.href,
          query: { user: row.name },
        })}
        title={<FormattedMessage defaultMessage="Topplistan" />}
        rows={grid}
      />
    </>
  );
};

export default Users;
