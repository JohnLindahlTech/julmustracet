import React, { FC, Fragment, isValidElement } from "react";
import Divider from "@material-ui/core/Divider";
import { Home as HomeIcon } from "@styled-icons/fa-solid/Home";
import { WineBottle as BottleIcon } from "@styled-icons/fa-solid/WineBottle";
import { Users as UsersIcon } from "@styled-icons/fa-solid/Users";
import { SignInAlt as LogInIcon } from "@styled-icons/fa-solid/SignInAlt";
import { SignOutAlt as LogoutIcon } from "@styled-icons/fa-solid/SignOutAlt";
import { PlusCircle as AddIcon } from "@styled-icons/fa-solid/PlusCircle";
import { UserEdit as UserEditIcon } from "@styled-icons/fa-solid/UserEdit";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Home,
  Users,
  Brands,
  LogIn,
  LogOut,
  UserEdit,
  AddDrink,
} from "../routes";
import { useSession } from "next-auth/client";
import { Hidden, Toolbar, Typography } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    noStyleLink: {
      textDecoration: "inherit",
      color: "inherit",
    },
  })
);

const menuItems = [
  {
    label: "Home",
    key: Home.href,
    href: Home.href,
    Icon: HomeIcon,
  },
  {
    label: "Top Users",
    key: Users.href,
    href: Users.href,
    Icon: UsersIcon,
  },
  {
    label: "Top Brands",
    key: Brands.href,
    href: Brands.href,
    Icon: BottleIcon,
  },
  <Divider key="div1" />,
  {
    label: "Log in",
    key: LogIn.href,
    href: LogIn.href,
    requireLoggedOut: true,
    Icon: LogInIcon,
  },
  {
    label: "Add Drink",
    key: AddDrink.href,
    href: AddDrink.href,
    requireLoggedIn: true,
    Icon: AddIcon,
  },
  {
    label: "Edit Profile",
    key: UserEdit.href,
    href: UserEdit.href,
    requireLoggedIn: true,
    Icon: UserEditIcon,
  },
  {
    label: "Log Out",
    key: LogOut.href,
    href: LogOut.href,
    requireLoggedIn: true,
    Icon: LogoutIcon,
  },
];

const MenuItem = ({ item, session }) => {
  if (isValidElement(item)) {
    return item;
  }
  if (item.requireLoggedOut && session) {
    return <Fragment />;
  }
  if (item.requireLoggedIn && !session) {
    return <Fragment />;
  }
  return (
    <li>
      <Link href={item.href} passHref>
        <ListItem button component="a">
          <ListItemIcon>
            <item.Icon size="32" />
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      </Link>
    </li>
  );
};

const MenuContent: FC = () => {
  const [session, loading] = useSession();
  const classes = useStyles();
  return (
    <div>
      <Toolbar>
        <Hidden smUp implementation="css">
          <Typography>JulmustRacet</Typography>
        </Hidden>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <MenuItem
            key={`${item.key}-${index}`}
            item={item}
            session={!loading && session}
          />
        ))}
      </List>
    </div>
  );
};

export default MenuContent;
