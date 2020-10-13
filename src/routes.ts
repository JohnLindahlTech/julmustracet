const userPath = "/konsumenter";
const brandPath = "/tillverkare";

export const Home = {
  href: "/",
};

export const Users = {
  href: userPath,
};

export const UserDetails = {
  href: (user) => `${userPath}/${user}`,
};

export const UserEdit = {
  href: `${userPath}/edit`,
};

export const Brands = {
  href: brandPath,
};

export const BrandDetails = {
  href: (brand) => `${brandPath}/${brand}`,
};

export const AddDrink = {
  href: "/ny",
};

export const LogIn = {
  href: "/api/auth/signin",
};

export const LogOut = {
  href: "/api/auth/signout",
};
