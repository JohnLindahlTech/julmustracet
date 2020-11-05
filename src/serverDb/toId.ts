const nonLetters = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~’]+/g;
const dashesAtBeginningOrEnd = /(^-+|-+$)/g;

// const drinkId = '[year]:drink:[username]:[time]:[createDate]';
// const achievementId = '[year]:achievement:[username]:[id]';

// 2020:drink:a
// 2020:drink:b
// 2021:drink:a
// 2021:drink:b

export function toId(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(nonLetters, "-")
    .replace(dashesAtBeginningOrEnd, "");
}

function padYear(year: number | string): string {
  const pad = "0000";
  return `${pad}${year}`.slice(-4);
}

export function toDrinkId(
  year: number | string,
  username?: string,
  time?: string | Date,
  createDate?: string | Date
): string {
  let str = `${padYear(year)}:drink`;
  if (!username) {
    return str;
  }
  str = `${str}:${toId(username)}`;
  if (!time) {
    return str;
  }
  if ((time as Date).toJSON) {
    str = `${str}:${(time as Date).toJSON()}`;
  } else {
    str = `${str}:${time}`;
  }
  if ((createDate as Date).toJSON) {
    str = `${str}:${(createDate as Date).toJSON()}`;
  } else {
    str = `${str}:${createDate}`;
  }

  return str;
}

export function toAchievementId(
  year: string | number,
  username?: string,
  achievement?: string
): string {
  let str = `${padYear(year)}:achievement`;
  if (!username) {
    return str;
  }
  str = `${str}:${toId(username)}`;
  if (!achievement) {
    return str;
  }
  return `${str}:${achievement}`;
}
