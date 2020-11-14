import { useCallback, useState } from "react";
import mapAchievementsToUsers from "../lib/mapAchievementsToUsers";
import { toAchievementId } from "./toId";
import useDB from "./useDB";

type AchievementsReturn = {
  loadAchievements: () => Promise<void>;
  achievements: any[];
  mappedAchievements: Record<string, any[]>;
  loading: boolean;
};
export default function useLoadAchievements(): AchievementsReturn {
  const db = useDB();
  const [achievements, setAchievements] = useState([]);
  const [mappedAchievements, setMappedAchievements] = useState({});
  const [loading, setLoading] = useState(true);

  const loadAchievements = useCallback(async () => {
    setLoading(true);
    try {
      const startkey = toAchievementId(new Date().getFullYear());
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
          };
        });
      // TODO transform to relevant data.
      setAchievements(docs);
      setMappedAchievements(mapAchievementsToUsers(docs));
    } finally {
      setLoading(false);
    }
  }, [db]);

  return { loadAchievements, achievements, mappedAchievements, loading };
}
