import { fromDrinkId } from "../../db/toId";
import calculateAmountBasedAchievements from "./calculateAmountBasedAchievements";
import calculateDiffs from "./calculateDiffs";
import calculateMiscAchievements from "./calculateMiscAchievements";
import calculateTimeBasedAchievements from "./calculateTimeBasedAchievements";
import loadUserData from "./loadUserData";
import prepareAchievement from "./prepareAchievement";
import saveAchievements from "./saveAchievements";

export default async function onChangeHandler(change) {
  const { year, username: usernameish } = fromDrinkId(change.id);
  const { drinks, achievements } = await loadUserData(year, usernameish);
  const { username } = drinks[0] ?? {};
  if (!username) {
    // TODO Throw and log or something;
    return;
  }
  const amountBased = calculateAmountBasedAchievements(drinks);
  const timeBased = calculateTimeBasedAchievements(drinks);
  const misc = calculateMiscAchievements(drinks);
  const time = new Date();
  const newAchievements = [...misc, ...amountBased, ...timeBased].map(
    prepareAchievement(username, time)
  );
  const diffs = calculateDiffs(achievements, newAchievements);
  await saveAchievements(diffs);
}
