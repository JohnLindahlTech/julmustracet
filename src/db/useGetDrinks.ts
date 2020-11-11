import { useCallback, useEffect, useState } from "react";
import { toDrinkId } from "./toId";
import useDB from "./useDB";

export default function useGetDrinks() {
  const db = useDB();
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDocs = useCallback(async () => {
    setLoading(true);
    try {
      const startkey = toDrinkId(new Date().getFullYear());
      const res = await db.allDocs({
        include_docs: true,
        startkey,
        endkey: `${startkey}\ufff0`,
      });
      const docs = res.rows
        .map((i) => i.doc)
        .map((d) => {
          return {
            ...d,
            createdAt: new Date(d.createdAt),
            updatedAt: new Date(d.updatedAt),
            time: new Date(d.time),
          };
        });
      console.log(docs);
      setDrinks(docs);
    } finally {
      setLoading(false);
    }
  }, [db]);

  useEffect(() => {
    const changes = db
      .changes({
        live: true,
        since: "now",
      })
      .on("change", getDocs);
    return () => {
      changes.cancel();
    };
  }, [db, getDocs]);

  useEffect(() => {
    getDocs();
  }, [getDocs]);

  return [drinks];
}
