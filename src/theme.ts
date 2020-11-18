import { red, grey } from "@material-ui/core/colors";
import {
  createMuiTheme,
  responsiveFontSizes,
  Theme,
} from "@material-ui/core/styles";
import { svSE, enUS } from "@material-ui/core/locale";

const config = {
  palette: {
    primary: {
      main: red[900],
    },
    secondary: {
      main: grey[600],
    },
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 14,
  },
};

const themeCache = {};

function getLocale(locale) {
  switch (locale) {
    case "en":
    case "en-US":
    case "en-GB":
      return enUS;
    default:
      return svSE;
  }
}

export function getLocalizedTheme(locale?: string): Theme {
  if (themeCache[locale]) {
    return themeCache[locale];
  }
  const localization = getLocale(locale);
  const theme = responsiveFontSizes(createMuiTheme(config, localization));
  themeCache[locale] = theme;
  return theme;
}

export default getLocalizedTheme();
