import {
  swatch,
  fileIcon,
  ai,
  logoShirt,
  stylishShirt,
} from "../customizer/index.js";

export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Tournaments",
    route: "/tournaments",
  },
  {
    label: "Leaderboard",
    route: "/leaderboard",
  },
  {
    label: "Explore",
    route: "/explore",
  },
  {
    label: "Profile",
    route: "/profile",
  },
];

export const adminLinks = [
  {
    label: "Create Product",
    route: "/product/create",
  },
];

export const productDefaultValues = {
  title: "",
  description: "",
  imageUrl: "",
  categoryId: "",
  prizePool: "",
  entryFee: "",
  startDate: new Date(),
  endDate: new Date(),
};

export const teamDefaultValues = {
  name: "",
  moto: "",
  description: "",
  imageUrl: "",
  categoryId: "",
  players: "",
};

export const EditorTabs = [
  // {
  //   name: "colorpicker",
  //   icon: swatch,
  // },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  // {
  //   name: "aipicker",
  //   icon: ai,
  // },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
