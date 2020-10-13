import { defaultLocale } from "./config";
import { isLocale } from "./types";

export function getLocale(potential) {
  if (isLocale(potential)) {
    return potential;
  }
  return defaultLocale;
}
