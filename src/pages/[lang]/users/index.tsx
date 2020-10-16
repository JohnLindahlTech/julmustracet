import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { DataGrid, SortDirection } from "@material-ui/data-grid";
import generateMockData from "../../../lib/generateMockData";
import mapGraphData from "../../../lib/mapGraphData";
import mapGridData from "../../../lib/mapGridData";
import LangLink from "../../../components/langLink";
import { Link } from "@material-ui/core";
import { UserDetails } from "../../../routes";

export {
  getStaticProps,
  getStaticPaths,
} from "../../../translations/getStaticPath";

const NameCell = ({ value }) => (
  <LangLink
    href={{ pathname: UserDetails.href, query: { user: value } }}
    passHref
  >
    <Link>{value}</Link>
  </LangLink>
);

const Users = () => {
  const intl = useIntl();
  const [graphData, setGraphData] = useState([]);
  const [gridData, setGridData] = useState([]);
  useEffect(() => {
    const res = mapGraphData(generateMockData());
    setGraphData(res);
    setGridData(mapGridData(res));
  }, []);

  const gridProps = {
    autoHeight: true,
    pageSize: 10,
    sortingOrder: ["desc", "asc"] as SortDirection[],
    sortModel: [
      {
        field: "position",
        sort: "asc" as SortDirection,
      },
    ],
    columns: [
      { field: "id", hide: true },
      {
        field: "position",
        type: "number",
        valueFormatter: ({ value }) =>
          intl.formatNumber(value as number, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }),
        headerName: intl.formatMessage({ defaultMessage: "Pos." }),
        width: 90,
      },
      {
        field: "name",
        type: "string",
        headerName: intl.formatMessage({ defaultMessage: "Namn" }),
        width: 300,
        renderCell: NameCell,
      },
      {
        field: "amount",
        type: "number",
        valueFormatter: ({ value }) =>
          intl.formatNumber(value as number, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        headerName: intl.formatMessage({ defaultMessage: "Mängd (Liter)" }),
        width: 150,
      },
    ],
  };

  return (
    <>
      <main>
        <h1>
          <FormattedMessage defaultMessage="Användarligan" />
        </h1>
        <div style={{ display: "flex", height: "100vh" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid rows={gridData} {...gridProps} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Users;
