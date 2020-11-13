import { red, grey } from "@material-ui/core/colors";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
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
});

theme = responsiveFontSizes(theme, { factor: 3 });

export default theme;
