import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { DataGrid, ColDef } from "@material-ui/data-grid";
import generateMockData from "../../../lib/generateMockData";
import mapGraphData from "../../../lib/mapGraphData";
import mapGridData from "../../../lib/mapGridData";

export {
  getStaticProps,
  getStaticPaths,
} from "../../../translations/getStaticPath";

const Users = () => {
  const intl = useIntl();
  const [graphData, setGraphData] = useState([]);
  const [gridData, setGridData] = useState([]);
  useEffect(() => {
    const res = mapGraphData(generateMockData());
    setGraphData(res);
    setGridData(mapGridData(res));
  }, []);

  const columns: ColDef[] = [
    { field: "id", hide: true },
    {
      field: "name",
      type: "string",
      headerName: intl.formatMessage({ defaultMessage: "Namn" }),
      width: 300,
    },
    {
      field: "amount",
      valueFormatter: ({ value }) =>
        intl.formatNumber(value as number, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      headerName: intl.formatMessage({ defaultMessage: "Mängd (L)" }),
      width: 150,
    },
  ];

  return (
    <>
      <main>
        <h1>
          <FormattedMessage defaultMessage="Användarligan" />
        </h1>
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid rows={gridData} columns={columns} />
        </div>
        <pre>
          <code>{JSON.stringify(gridData, null, 2)}</code>
        </pre>
        <pre>
          <code>{JSON.stringify(graphData, null, 2)}</code>
        </pre>
      </main>
    </>
  );
};

export default Users;
