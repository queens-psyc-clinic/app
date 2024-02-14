import home from "../assets/icons/home.svg";
import homeColor from "../assets/icons/home-color.svg";
import overdue from "../assets/icons/overdue.svg";
import overdueColor from "../assets/icons/overdue-color.svg";
import signOut from "../assets/icons/sign-out.svg";
import signOutColor from "../assets/icons/sign-out-color.svg";
import lowStock from "../assets/icons/low-stock.svg";
import lowStockColor from "../assets/icons/low-stock-color.svg";
import archive from "../assets/icons/archive.svg";

export const clientMenuOptions = [
  {
    title: "home",
    defaultIcon: home,
    selectedIcon: homeColor,
    url: "/",
  },
  {
    title: "sign-out",
    defaultIcon: signOut,
    selectedIcon: signOutColor,
    url: "/signed-out",
  },
  {
    title: "overdue",
    defaultIcon: overdue,
    selectedIcon: overdueColor,
    url: "/overdue",
  },
];

export const adminMenuOptions = clientMenuOptions.concat([
  {
    title: "low stock",
    defaultIcon: lowStock,
    selectedIcon: lowStockColor,
    url: "/low-stock",
  },
  {
    title: "archive",
    defaultIcon: archive,
    selectedIcon: archive,
    url: "/archive",
  },
]);
