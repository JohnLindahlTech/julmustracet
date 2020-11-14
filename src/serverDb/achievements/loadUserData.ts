import { toAchievementId, toDrinkId } from "../../db/toId";
import { julmustracetDb } from "../dbs";

const endChar = "\uFFF0";

export default async function loadUserData(year, username) {
  const userDrinkIds = toDrinkId(year, username);
  const userAchievementIds = toAchievementId(year, username);

  const [drinksRes, achievementsRes] = await Promise.all([
    julmustracetDb.allDocs({
      include_docs: true,
      startkey: userDrinkIds,
      endkey: `${userDrinkIds}${endChar}`,
    }),
    julmustracetDb.allDocs({
      include_docs: true,
      startkey: userAchievementIds,
      endkey: `${userAchievementIds}${endChar}`,
    }),
  ]);
  return {
    drinks: drinksRes.rows
      .map((row) => row.doc)
      .map((doc) => ({
        ...doc,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        time: new Date(doc.time),
      })),
    achievements: achievementsRes.rows.map((row) => row.doc),
  };
}
