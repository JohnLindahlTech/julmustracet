import { toAchievementId } from "../../db/toId";

export default function propareAchievement(username: string, time: Date) {
  return (seed: { name: "string"; prio: number }) => {
    const _id = toAchievementId(time.getFullYear(), username, seed.prio);
    return {
      ...seed,
      _id,
      username,
      createdAt: time.toJSON(),
      updatedAt: time.toJSON(),
    };
  };
}
