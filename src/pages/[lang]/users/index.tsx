import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import generateMockData from "../../../lib/generateMockData";
import mapGraphData from "../../../lib/mapGraphData";
import mapGridData from "../../../lib/mapGridData";

export {
  getStaticProps,
  getStaticPaths,
} from "../../../translations/getStaticPath";

const Users = () => {
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
        <h1>
          <FormattedMessage defaultMessage="Användarligan" />
        </h1>
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
