export const LOCALE_KEY = "locale";

export function getLocale(): string | void {
  return (
    typeof localStorage !== "undefined" && localStorage.getItem(LOCALE_KEY)
  );
}

export function setLocale(locale: string): void {
  typeof localStorage !== "undefined" &&
    localStorage.setItem(LOCALE_KEY, locale);
}
