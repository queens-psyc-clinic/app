import home from "../assets/icons/home.svg";
import homeColor from "../assets/icons/home-color.svg";
import overdue from "../assets/icons/overdue.svg";
import overdueColor from "../assets/icons/overdue-color.svg";
import signOut from "../assets/icons/sign-out.svg";
import signOutColor from "../assets/icons/sign-out-color.svg";
import lowStock from "../assets/icons/low-stock.svg";
import lowStockColor from "../assets/icons/low-stock-color.svg";
import archive from "../assets/icons/archive.svg";
import requests from "../assets/icons/requests.svg";
import accounts from "../assets/icons/users.svg";
import { Pages } from "./Pages";

export const clientMenuOptions = [
  {
    page: Pages.dashboard,
    defaultIcon: home,
    selectedIcon: homeColor,
    url: "/",
    title: "Dashboard",
  },
  {
    page: Pages.signedOut,
    defaultIcon: signOut,
    selectedIcon: signOutColor,
    url: "/signed-out",
    title: "Signed Out",
  },
  {
    page: Pages.overdue,
    defaultIcon: overdue,
    selectedIcon: overdueColor,
    url: "/overdue",
    title: "Overdue",
  },
  {
    page: Pages.archive,
    defaultIcon: archive,
    selectedIcon: archive,
    url: "/archive",
    title: "Archive",
  },
];

export const adminMenuOptions = [
  {
    page: Pages.dashboard,
    defaultIcon: home,
    selectedIcon: homeColor,
    url: "/",
    title: "Dashboard",
  },
  {
    page: Pages.requests,
    defaultIcon: requests,
    selectedIcon: requests,
    url: "/requests",
    title: "Requests",
  },
  {
    page: Pages.signedOut,
    defaultIcon: signOut,
    selectedIcon: signOutColor,
    url: "/signed-out",
    title: "Signed Out",
  },
  {
    page: Pages.overdue,
    defaultIcon: overdue,
    selectedIcon: overdueColor,
    url: "/overdue",
    title: "Overdue",
  },
  {
    page: Pages.lowStock,
    defaultIcon: lowStock,
    selectedIcon: lowStockColor,
    url: "/low-stock",
    title: "Low Stock",
  },
  {
    page: Pages.archive,
    defaultIcon: archive,
    selectedIcon: archive,
    url: "/archive",
    title: "Archive",
  },
  {
    page: Pages.accounts,
    defaultIcon: accounts,
    selectedIcon: accounts,
    url: "/admin/accounts",
    title: "Accounts",
  },
];
