/*
There are 5 different variations of tables in our design, some vary by column order and some have different columns
*/

// Each column has a size to define how wide we want it's width to be

export const defaultColumns = [
  { title: "Name", size: "large", center: false },
  { title: "Item Name", size: "medium", center: false },
  { title: "Measure", size: "medium", center: false },
  { title: "Item", size: "small", center: false },
  { title: "Ages", size: "small", center: false },
  { title: "Acronym", size: "small", center: true },
  { title: "Level", size: "xs", center: true },
  { title: "Edition", size: "xs", center: true },
];

export const signedOutColums = [
  "Name",
  "Item Name",
  "Acronym",
  "Borrowed By",
  "Checked Out",
  "Measure",
  "Item",
  "Ages",
  "Acronym",
  "Level",
  "Edition",
];

export const overdueColumns = [
  "Name",
  "Item Name",
  "Acronym",
  "Borrowed By",
  "Checked Out",
  "Last Notified",
  "Measure",
  "Item",
  "Ages",
  "Acronym",
  "Level",
  "Edition",
];

export const lowStockColumns = [
  "Quantity",
  "Ordering Company",
  "Name",
  "Item Name",
  "Measure",
  "Item",
  "Ages",
  "Acronym",
  "Level",
  "Edition",
];
// this one doesn't need checkboxes on the rows
