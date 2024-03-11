import { LibraryItem } from "./libraryItem";

export interface Notification {
  notificationType: notificationType;
  itemName: string;
  date: string;
  time: string;
}

export enum notificationType {
  overdue = "Time to Return",
  lowStock = "Running Low",
}
