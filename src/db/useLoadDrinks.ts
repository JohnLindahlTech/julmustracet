import { useCallback, useState } from "react";
import * as Sentry from "@sentry/node";
import { toDrinkId } from "./toId";
import useDB from "./useDB";

type DrinkReturn = {
  loadDrinks: () => Promise<void>;
  drinks: any[];
  loading: boolean;
};

export default function useLoadDrinks(): DrinkReturn {
  const { db } = useDB();
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDrinks = useCallback(async () => {
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

      setDrinks(docs.sort((a, b) => a.time.getTime() - b.time.getTime()));
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [db]);
  return {
    loadDrinks,
    drinks,
    loading,
  };
}
