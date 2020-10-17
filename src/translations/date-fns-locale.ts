import { sv, enGB } from "date-fns/locale";
import { EN } from "./config";

function getDateFnsLocale(locale: string) {
  switch (locale) {
    case EN:
      return enGB;
    default:
      return sv;
  }
}

export default getDateFnsLocale;
