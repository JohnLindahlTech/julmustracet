import achievementsMap from "./achievementsMap";

export default function calculateMiscAchievements(drinks) {
  const achievements = [];

  if (drinks.length > 1 && drinks[0].amount > 0) {
    achievements.push({
      prio: 2,
      name: achievementsMap[2],
    });
  }

  const brands = drinks.reduce((set, d) => {
    set.add(d.brand);
    return set;
  }, new Set());

  if (brands.size >= 5) {
    achievements.push({
      prio: 3,
      name: achievementsMap[3],
    });
  }

  return achievements;
}
