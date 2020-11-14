const nonLetters = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~’]+/g;
const dashesAtBeginningOrEnd = /(^-+|-+$)/g;

const separator = "_";
const drink = "drink";
const achievement = "achievement";

// const drinkId = '[year]_drink_[username]_[time]_[createDate]';
// const achievementId = '[year]_achievement_[username]_[id]';

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
  let str = `${padYear(year)}${separator}${drink}`;
  if (!username) {
    return str;
  }
  str = `${str}${separator}${toId(username)}`;
  if (!time) {
    return str;
  }
  if ((time as Date).toJSON) {
    str = `${str}${separator}${(time as Date).toJSON()}`;
  } else {
    str = `${str}${separator}${time}`;
  }
  if ((createDate as Date).toJSON) {
    str = `${str}${separator}${(createDate as Date).toJSON()}`;
  } else {
    str = `${str}${separator}${createDate}`;
  }

  return str;
}

type Drink = {
  year: number;
  username: string;
  time: Date;
  createdAt: Date;
};

export function fromDrinkId(id: string): Drink {
  const [yearString, , username, timeString, createdAtString] = id.split(
    separator
  );
  return {
    year: Number.parseInt(yearString, 10),
    username,
    time: new Date(timeString),
    createdAt: new Date(createdAtString),
  };
}

export function toAchievementId(
  year: string | number,
  username?: string,
  prio?: number | string
): string {
  let str = `${padYear(year)}${separator}${achievement}`;
  if (!username) {
    return str;
  }
  str = `${str}${separator}${toId(username)}`;
  if (!prio) {
    return str;
  }
  return `${str}${separator}${padYear(prio)}`;
}

type Achievement = {
  year: number;
  username: string;
  prio: string;
};
export function fromAchievementId(id: string): Achievement {
  const [yearString, , username, prio] = id.split(separator);
  return {
    year: Number.parseInt(yearString, 10),
    username,
    prio,
  };
}
