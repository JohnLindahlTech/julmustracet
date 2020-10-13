import { defaultLocale } from "./config";
import { getLocale } from "./localStorage";
import { Locale, isLocale } from "./types";

export function getInitialLocale(): Locale {
  const localSetting = getLocale();
  if (localSetting && isLocale(localSetting)) {
    return localSetting;
  }

  const [browserSetting] = navigator.language.split("-");
  if (isLocale(browserSetting)) {
    return browserSetting;
  }

  return defaultLocale;
}
