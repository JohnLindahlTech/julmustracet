import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "./link";
import { FormattedMessage } from "react-intl";
import {
  Home,
  Users,
  UserDetails,
  UserEdit,
  Brands,
  BrandDetails,
  AddDrink,
} from "../routes";

const Footer = () => {
  const [user, setUser] = useState("Kebeb");
  const [brand, setBrand] = useState("Apotekarnes");
  return (
    <div style={{ height: 1000 }}>
      <hr />
      <ul>
        <li>
          <Link {...Home}>
            <FormattedMessage defaultMessage="Start" />
          </Link>
        </li>
        <li>
          <Link {...Users}>
            <FormattedMessage defaultMessage="Användare" />
          </Link>
        </li>
        <li>
          <Link href={UserDetails.href(user)}>{user}</Link>
          <TextField
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </li>
        <li>
          <Link {...UserEdit}>
            <FormattedMessage defaultMessage="Redigera Användare" />
          </Link>
        </li>
        <li>
          <Link {...Brands}>
            <FormattedMessage defaultMessage="Märken" />
          </Link>
        </li>
        <li>
          <Link href={BrandDetails.href(brand)}>{brand}</Link>
        </li>
        <TextField
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <li>
          <Link {...AddDrink}>
            <FormattedMessage defaultMessage="Lägg till dryck" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
