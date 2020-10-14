export const SV = "sv";
export const EN = "en";

export const defaultLocale = SV;

export const locales = [EN, SV] as const;

export const languageNames = {
  [EN]: "English",
  [SV]: "Svenska",
};
