import React, { FC } from "react";
import Divider from "@material-ui/core/Divider";
import { Home as HomeIcon } from "@styled-icons/fa-solid/Home";
import { WineBottle as BottleIcon } from "@styled-icons/fa-solid/WineBottle";
import { Users as UsersIcon } from "@styled-icons/fa-solid/Users";
import { SignInAlt as LogInIcon } from "@styled-icons/fa-solid/SignInAlt";
import { SignOutAlt as LogoutIcon } from "@styled-icons/fa-solid/SignOutAlt";
import { PlusCircle as AddIcon } from "@styled-icons/fa-solid/PlusCircle";
import { UserEdit as UserEditIcon } from "@styled-icons/fa-solid/UserEdit";
import { Book as RulesIcon } from "@styled-icons/fa-solid/Book";
import List from "@material-ui/core/List";

import { useIntl, FormattedMessage } from "react-intl";
import {
  Home,
  Users,
  Brands,
  LogIn,
  LogOut,
  UserEdit,
  AddDrink,
  Rules,
} from "../../routes";
import useOfflineSession from "../../db/useOfflineSession";
import { Hidden, Toolbar, Typography } from "@material-ui/core";

import MenuItem, { MenuItemProps } from "./MenuItem";
import MenuLangPicker from "./MenuLangPicker";

const MenuContent: FC = () => {
  const [session, loading] = useOfflineSession();
  const intl = useIntl();
  const menuItems: Array<MenuItemProps["item"] | JSX.Element> = [
    {
      label: intl.formatMessage({ defaultMessage: "Start" }),
      key: Home.href,
      href: Home.href,
      Icon: HomeIcon,
    },
    {
      label: intl.formatMessage({ defaultMessage: "Användarligan" }),
      key: Users.href,
      href: Users.href,
      Icon: UsersIcon,
    },
    {
      label: intl.formatMessage({ defaultMessage: "Märkesligan" }),
      key: Brands.href,
      href: Brands.href,
      Icon: BottleIcon,
    },
    {
      label: intl.formatMessage({ defaultMessage: "Regler" }),
      key: Rules.href,
      href: Rules.href,
      Icon: RulesIcon,
    },
    <Divider key="div1" />,
    {
      label: intl.formatMessage({ defaultMessage: "Logga in" }),
      key: LogIn.href,
      href: LogIn.href,
      requireLoggedOut: true,
      Icon: LogInIcon,
    },
    {
      label: intl.formatMessage({ defaultMessage: "Lägg till dryck" }),
      key: AddDrink.href,
      href: AddDrink.href,
      requireLoggedIn: true,
      Icon: AddIcon,
    },
    {
      label: intl.formatMessage({ defaultMessage: "Redigera användare" }),
      key: UserEdit.href,
      href: UserEdit.href,
      requireLoggedIn: true,
      Icon: UserEditIcon,
    },
    {
      label: intl.formatMessage({ defaultMessage: "Logga ut" }),
      key: LogOut.href,
      href: LogOut.href,
      requireLoggedIn: true,
      Icon: LogoutIcon,
    },
    <Divider key="div2" />,
    <MenuLangPicker key="langPicker" />,
  ];
  return (
    <div>
      <Toolbar>
        <Hidden smUp implementation="css">
          <Typography>
            <FormattedMessage defaultMessage="JulmustRacet" />
          </Typography>
        </Hidden>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <MenuItem
            key={`${item.key}-${index}`}
            item={item}
            loading={loading}
            session={session}
          />
        ))}
      </List>
    </div>
  );
};

export default MenuContent;
