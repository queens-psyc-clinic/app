/*
There are 5 different variations of tables in our design, some vary by column order and some have different columns
*/

// Each column has a size to define how wide we want it's width to be

export interface Column {
  title: string;
  size: string;
  center: boolean;
  customComponent?: columnCustomComponents;
}

export enum columnCustomComponents {
  link,
  pill,
  user,
}

export const defaultColumns: Column[] = [
  { title: "Acronym", size: "small", center: true },
  { title: "Name", size: "medium", center: false },
  // { title: "Item Name", size: "small", center: false },
  {
    title: "Measure",
    size: "medium",
    center: false,
    customComponent: columnCustomComponents.pill,
  },
  { title: "Edition", size: "xs", center: true },
  // {
  //   title: "Item",
  //   size: "small",
  //   center: true,
  //   customComponent: columnCustomComponents.pill,
  // },
  // { title: "Ages", size: "small", center: true },
  { title: "Level", size: "xs", center: true },
];
export const signedOutColums: Column[] = [
  { title: "Name", size: "large", center: false },
  {
    title: "Item Name",
    size: "small",
    center: false,
  },
  { title: "Acronym", size: "small", center: true },
  {
    title: "Borrowed By",
    size: "small",
    center: false,
    customComponent: columnCustomComponents.user,
  },
  { title: "Checked Out", size: "small", center: false },
  {
    title: "Measure",
    size: "medium",
    center: false,
    customComponent: columnCustomComponents.pill,
  },
];

export const reservationsColumns: Column[] = [
  { title: "Name", size: "large", center: false },
  {
    title: "Item Name",
    size: "small",
    center: false,
  },
  { title: "Acronym", size: "small", center: true },
  {
    title: "Borrowed By",
    size: "small",
    center: false,
    customComponent: columnCustomComponents.user,
  },
  { title: "Checked Out", size: "small", center: false },
  {
    title: "Measure",
    size: "small",
    center: false,
    customComponent: columnCustomComponents.pill,
  },
  { title: "Quantity", size: "xs", center: true },
];

export const overdueColumns: Column[] = [
  { title: "Name", size: "large", center: false },
  {
    title: "Item Name",
    size: "small",
    center: false,
  },
  { title: "Acronym", size: "small", center: true },
  {
    title: "Borrowed By",
    size: "small",
    center: false,
    customComponent: columnCustomComponents.user,
  },
  { title: "Checked Out", size: "small", center: false },
  { title: "Last Notified", size: "small", center: false },
  {
    title: "Measure",
    size: "medium",
    center: false,
    customComponent: columnCustomComponents.pill,
  },
  { title: "Quantity", size: "xs", center: true },
  // {
  //   title: "Item",
  //   size: "small",
  //   center: true,
  //   customComponent: columnCustomComponents.pill,
  // },
  // { title: "Ages", size: "small", center: true },
  // { title: "Level", size: "xs", center: true },
  // { title: "Edition", size: "xs", center: true },
];

export const lowStockColumns: Column[] = [
  { title: "Quantity", size: "xs", center: true },
  {
    title: "Ordering Company",
    size: "medium",
    center: false,
    customComponent: columnCustomComponents.link,
  },
  { title: "Name", size: "large", center: false },
  {
    title: "Item Name",
    size: "small",
    center: false,
  },
  // {
  //   title: "Measure",
  //   size: "medium",
  //   center: false,
  //   customComponent: columnCustomComponents.pill,
  // },
  // {
  //   title: "Item",
  //   size: "small",
  //   center: true,
  //   customComponent: columnCustomComponents.pill,
  // },
  // { title: "Ages", size: "small", center: true },  // TODO UNCOMMENT THIS WHEN AGES IS ADDED TO DB
  // { title: "Acronym", size: "small", center: true },
  // { title: "Level", size: "xs", center: true },
  { title: "Edition", size: "xs", center: true },
];
// this one doesn't need checkboxes on the rows

export const accountColumns: Column[] = [
  { title: "First Name", size: "small", center: false },
  { title: "Last Name", size: "small", center: false },
  { title: "Email", size: "small", center: false },
];
