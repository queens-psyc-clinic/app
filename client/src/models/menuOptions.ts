import home from "../assets/icons/home.svg";
import homeColor from "../assets/icons/home-color.svg";
import overdue from "../assets/icons/overdue.svg";
import overdueColor from "../assets/icons/overdue-color.svg";
import signOut from "../assets/icons/sign-out.svg";
import signOutColor from "../assets/icons/sign-out-color.svg";
import lowStock from "../assets/icons/low-stock.svg";
import lowStockColor from "../assets/icons/low-stock-color.svg";
import archive from "../assets/icons/archive.svg";
import { Pages } from "./Pages";

export const clientMenuOptions = [
  {
    page: Pages.dashboard,
    defaultIcon: home,
    selectedIcon: homeColor,
    url: "/client",
  },
  {
    page: Pages.signedOut,
    defaultIcon: signOut,
    selectedIcon: signOutColor,
    url: "/client/signed-out",
  },
  {
    page: Pages.overdue,
    defaultIcon: overdue,
    selectedIcon: overdueColor,
    url: "/client/overdue",
  },
];

export const adminMenuOptions = [
  {
    page: Pages.dashboard,
    defaultIcon: home,
    selectedIcon: homeColor,
    url: "/admin",
  },
  {
    page: Pages.signedOut,
    defaultIcon: signOut,
    selectedIcon: signOutColor,
    url: "/admin/signed-out",
  },
  {
    page: Pages.overdue,
    defaultIcon: overdue,
    selectedIcon: overdueColor,
    url: "/admin/overdue",
  },
  {
    page: Pages.lowStock,
    defaultIcon: lowStock,
    selectedIcon: lowStockColor,
    url: "/admin/low-stock",
  },
  {
    page: Pages.archive,
    defaultIcon: archive,
    selectedIcon: archive,
    url: "/admin/archive",
  },
];
