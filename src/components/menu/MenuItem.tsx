import React, { ComponentType, FC, Fragment, isValidElement } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Skeleton } from "@material-ui/lab";
import Link from "next/link";
import { Url } from "../../types/url";
import { useTheme } from "@material-ui/core/styles";

export type Item = {
  key?: string;
  href: Url;
  Icon: ComponentType<{ size: string | number; style: any }>;
  requireLoggedOut?: boolean;
  requireLoggedIn?: boolean;
  label: unknown;
};

export type MenuItemProps = {
  item: JSX.Element | Item;
  session: unknown;
  loading?: boolean;
};

const MenuItem: FC<MenuItemProps> = ({ item, session, loading }) => {
  const theme = useTheme();
  if (isValidElement(item)) {
    return item;
  }
  const i = item as Item;
  if (loading && i.requireLoggedOut) {
    return (
      <li>
        <ListItem button component="a">
          <ListItemIcon>
            <Skeleton
              variant="circle"
              height={32}
              width={32}
              animation="wave"
            />
          </ListItemIcon>
          <ListItemText primary={<Skeleton animation="wave" />} />
        </ListItem>
      </li>
    );
  }
  if (i.requireLoggedOut && (session || loading)) {
    return <Fragment />;
  }
  if (i.requireLoggedIn && (!session || loading)) {
    return <Fragment />;
  }
  return (
    <li>
      <Link href={i.href} passHref>
        <ListItem button component="a">
          <ListItemIcon>
            <i.Icon
              style={{ color: theme.palette.primary.main }}
              size={theme.spacing(4)}
            />
          </ListItemIcon>
          <ListItemText primary={i.label} />
        </ListItem>
      </Link>
    </li>
  );
};

export default MenuItem;
