import { useCallback, useState } from "react";
import * as Sentry from "@sentry/node";
import { toDrinkId } from "./toId";
import useDB from "./useDB";
import useOfflineSession from "./useOfflineSession";

export default function usePutDrink(): [
  (data: unknown) => Promise<any>,
  { loading: boolean }
] {
  const db = useDB();
  const [session] = useOfflineSession();
  const [loading, setLoading] = useState(false);

  const put = useCallback(
    async (data) => {
      setLoading(true);
      const _id = toDrinkId(
        new Date().getFullYear(),
        session.user.username,
        data.time,
        new Date()
      );
      try {
        return await db.validatingPut(
          {
            _id,
            type: "drink",
            createdAt: new Date(),
            ...data,
            username: session.user.username,
            updatedAt: new Date(),
          },
          {
            userCtx: {
              db: "julmustracet",
              name: session.user.name,
              roles: session.user.roles,
            },
          }
        );
      } catch (error) {
        Sentry.captureException(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [db, session]
  );
  return [put, { loading }];
}
