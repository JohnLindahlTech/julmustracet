import { differenceInMinutes } from "date-fns";
import achievementsMap from "./achievementsMap";
export default function calculateTimeBasedAchievements(drinks) {
  const times = drinks
    .map((d) => d.time)
    .sort((a, b) => a.getTime() - b.getTime());
  const achievements = [];
  try {
    if (times.find((t, i, a) => differenceInMinutes(t, a[i + 1]) <= 15)) {
      achievements.push({
        prio: 13,
        name: achievementsMap[13],
      });
    }
  } catch (err) {
    // I am at the end of the array and did not find anything.
  }

  const weekdays: Set<number> = new Set();
  const hours: Set<number> = new Set();
  const days: Set<number> = new Set();

  times.forEach((t) => {
    weekdays.add(t.getDay());
    hours.add(t.getHours());
    days.add(t.getDate());
  });

  if (hours.size === 24) {
    achievements.push({
      prio: 12,
      name: achievementsMap[12],
    });
  }

  if (weekdays.size === 7) {
    achievements.push({
      prio: 19,
      name: achievementsMap[19],
    });
  }

  if (weekdays.size === 7 && hours.size === 24) {
    achievements.push({
      prio: 20,
      name: achievementsMap[20],
    });
  }

  let max = 1;
  let curr = 1;
  const allDays = Array.from(days).sort((a, b) => a - b);

  allDays.forEach((d, i, a) => {
    if (d + 1 === a[i + 1] ?? -1) {
      curr += 1;
      max = curr > max ? curr : max;
    } else {
      curr = 1;
    }
  });

  [3, 5, 7, 14, 20].forEach((count, index) => {
    if (max >= count) {
      achievements.push({
        prio: 14 + index,
        name: achievementsMap[14 + index],
      });
    }
  });
  return achievements;
}
