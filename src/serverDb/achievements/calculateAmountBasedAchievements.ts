import achievementsMap from "./achievementsMap";

export default function calculateAmountBasedAchievements(drinks) {
  const achievements = [];
  const amount = drinks.reduce(
    (sum, drink) => (sum ?? 0) + (drink.amount ?? 0),
    0
  );
  [1, 3, 5, 10, 20, 30, 50, 90].forEach((target, index) => {
    if (amount >= target) {
      achievements.push({
        name: achievementsMap[4 + index],
        prio: 4 + index,
      });
    }
  });
  return achievements;
}
