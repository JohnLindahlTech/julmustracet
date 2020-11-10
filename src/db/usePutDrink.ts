import { useCallback, useState } from "react";
import useDB from "./useDB";

export default function usePutDrink() {
  const db = useDB();
  const loading = useState(false);

  const put = useCallback(
    (data) => {
      db.validatePut();
    },
    [db]
  );
  return [put, { loading }];
}
