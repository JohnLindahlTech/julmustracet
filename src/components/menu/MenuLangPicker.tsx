import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FormattedMessage } from "react-intl";
import React from "react";
import Link from "../langLink";
import { useRouter } from "next/router";
import { Locale } from "../../translations/types";
import { EN, SV } from "../../translations/config";
import LangPickerIcon from "../LangPickerIcon";

const MenuLangPicker = () => {
  const router = useRouter();
  const { query, pathname } = router;
  const { lang } = router.query as { lang: Locale };
  const newLang = lang === SV ? EN : SV;

  return (
    <li>
      <Link
        href={{
          pathname,
          query: {
            ...query,
            lang: newLang,
          },
        }}
        passHref
      >
        <ListItem button component="a">
          <ListItemIcon>
            <LangPickerIcon lang={lang} />
          </ListItemIcon>
          <ListItemText
            primary={<FormattedMessage defaultMessage="Change to english" />}
          />
        </ListItem>
      </Link>
    </li>
  );
};

export default MenuLangPicker;
