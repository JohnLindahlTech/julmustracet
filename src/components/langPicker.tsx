import React, { FC, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "./langLink";
import FlagUK from "./flags/uk";
import FlagSV from "./flags/sv";
import { setLocale } from "../translations/localStorage";
import {
  makeStyles,
  createStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import { EN, SV } from "../translations/config";

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

const LangPicker: FC = () => {
  const theme = useTheme();
  const classes = useStyles();
  const router = useRouter();
  const { query, pathname } = router;
  const { lang } = router.query;
  const newLang = lang === SV ? EN : SV;

  const onLocaleChange = useCallback(() => {
    setLocale(newLang);
  }, [newLang]);

  return (
    <Link
      href={{
        pathname,
        query: {
          ...query,
          lang: newLang,
        },
      }}
    >
      <a onClick={onLocaleChange}>
        <div className={classes.container}>
          <div className={classes.flag}>
            <FlagSV
              disabled={lang === EN}
              height={theme.spacing(4)}
              hideRight
            />
          </div>
          <div className={classes.flag}>
            <FlagUK disabled={lang === SV} height={theme.spacing(4)} hideLeft />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default LangPicker;
