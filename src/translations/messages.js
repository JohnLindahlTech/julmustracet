import sv from "../../compiled-lang/sv.json";
import en from "../../compiled-lang/en.json";

export function getMessages(locale) {
  switch (locale) {
    case "en":
      return en;
    default:
      return sv;
  }
}
