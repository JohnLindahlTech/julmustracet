import { addHours, isBefore } from "date-fns";
import { Point } from "../types/point";
import { maxLimitDate, minLimitDate } from "./rules";

const amounts = [0.33, 0.5, 1.4, 1.5];

const names = [
  "Name1",
  "Name2",
  "Name3",
  "Name4",
  "Name5",
  "Name6",
  "Name7",
  "Name8",
  "Name9@example.com",
  "Name10 And an extra long one at that",
];

const brands = ["apotekarnes", "nygårda", "zeunerts"];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomAmount() {
  const seed = getRandomInt(0, amounts.length - 1);
  return amounts[seed];
}

function getRandomBrand() {
  const seed = getRandomInt(0, brands.length - 1);
  return brands[seed];
}

function getRandomName() {
  const seed = getRandomInt(0, names.length - 1);
  return names[seed];
}

function generatePoint(id: number, time: Date): Point {
  return {
    id,
    user: getRandomName(),
    brand: getRandomBrand(),
    amount: getRandomAmount(),
    time,
  };
}

export default function generateMockData(): Point[] {
  let nextId = 0;
  let time = minLimitDate;
  const data = [];
  while (isBefore(time, maxLimitDate)) {
    time = addHours(time, getRandomInt(4, 16));
    data.push(generatePoint(nextId++, time));
  }
  return data;
}
