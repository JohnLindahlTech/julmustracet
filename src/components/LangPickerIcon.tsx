import React, { FC } from "react";
import FlagUK from "./flags/uk";
import FlagSV from "./flags/sv";
import {
  makeStyles,
  createStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import { EN, SV } from "../translations/config";
import { Locale } from "../translations/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
      display: "inline-block",
      height: theme.spacing(4),
      width: theme.spacing(4),
    },
    flag: {
      position: "absolute",
      left: 0,
      top: 0,
    },
  })
);

type Props = {
  lang: Locale;
};

const LangPickerIcon: FC<Props> = ({ lang = SV }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.flag}>
        <FlagSV disabled={lang === EN} height={theme.spacing(4)} hideRight />
      </div>
      <div className={classes.flag}>
        <FlagUK disabled={lang === SV} height={theme.spacing(4)} hideLeft />
      </div>
    </div>
  );
};

export default LangPickerIcon;
