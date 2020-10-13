const root = "/[lang]";
const userPath = `${root}/users`;
const brandPath = `${root}/brands`;
const authAPI = `/api/auth`;

export const Home = {
  href: root,
};

export const Users = {
  href: userPath,
};

export const UserDetails = {
  href: `${userPath}/[user]`,
};

export const UserEdit = {
  href: `${userPath}/edit`,
};

export const Brands = {
  href: brandPath,
};

export const BrandDetails = {
  href: `${brandPath}/[brand]`,
};

export const AddDrink = {
  href: `${root}/add`,
};

export const LogIn = {
  href: `${authAPI}/signin`,
};

export const LogOut = {
  href: `${authAPI}/signout`,
};
