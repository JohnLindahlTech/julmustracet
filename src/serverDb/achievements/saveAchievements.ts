import { julmustracetDb } from "../dbs";

export default async function saveAchievements(achievements) {
  const result = await julmustracetDb.bulkDocs(achievements);
  // The only reason to get conflicts is because we are doing a delete of a now defunct achievement.
  const retries = result.reduce((ret, doc, index) => {
    if (doc.error) {
      if (doc.status !== 409) {
        // TODO Log this badboi
        return ret;
      }
      ret.push(achievements[index]);
    }
    return ret;
  }, []);
  if (retries.length <= 0) {
    return;
  }
  const newOnes = await julmustracetDb.allDocs({
    keys: retries.map((r) => r._id),
    include_docs: true,
  });

  await julmustracetDb.bulkDocs(
    retries.map((r, i) => ({ ...r, _rev: newOnes[i]._rev }))
  );
}
