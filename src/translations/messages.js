import en from "../../compiled-lang/en.json";
import sv from "../../compiled-lang/sv.json";
import { EN } from "./config";

export function getMessages(locale) {
  switch (locale) {
    case EN:
      return en;
    default:
      return sv;
  }
}
