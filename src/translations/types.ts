import { locales } from "./config";

export type Locale = typeof locales[number];

export function isLocale(tested: string): tested is Locale {
  return locales.some((locale) => locale === tested);
}
