export type Achievement = {
  _id: string;
  _rev: string;
  _deleted?: boolean;
  type: "achievement";
  time: Date;
  name: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserAchievements = {
  username: string;
  achievements: Achievement[];
  loading?: boolean;
};

export type AchievementsMap = {
  [username: string]: UserAchievements;
};

export default function mapAchievementsToUsers(
  achievements: Achievement[] = []
): AchievementsMap {
  return achievements.reduce((map, achievement) => {
    const { username } = achievement;
    if (!map[username]) {
      map[username] = {
        username: username,
        achievements: [achievement],
      };
    } else {
      map[username].achievements.push(achievement);
    }
    return map;
  }, {});
}
