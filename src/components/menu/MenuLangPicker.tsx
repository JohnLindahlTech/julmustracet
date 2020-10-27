import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FormattedMessage } from "react-intl";
import React from "react";
import LangLink from "../langLink";
import { Locale } from "../../translations/types";
import { EN, SV } from "../../translations/config";
import LangPickerIcon from "../LangPickerIcon";
import useLangRouter from "../../hooks/useLangRouter";

const MenuLangPicker = () => {
  const router = useLangRouter();
  const { query, pathname, locale } = router;
  const newLocale = locale === SV ? EN : SV;

  return (
    <li>
      <LangLink
        href={{
          pathname,
          query,
        }}
        locale={newLocale}
        passHref
      >
        <ListItem button component="a">
          <ListItemIcon>
            <LangPickerIcon lang={newLocale as Locale} />
          </ListItemIcon>
          <ListItemText
            primary={<FormattedMessage defaultMessage="Change to english" />}
          />
        </ListItem>
      </LangLink>
    </li>
  );
};

export default MenuLangPicker;
