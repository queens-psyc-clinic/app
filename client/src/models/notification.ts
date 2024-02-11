export interface Notification {
  notificationType: "overdue" | "low stock";
}

export enum notificationType {
  overdue = "Time to Return",
  lowStock = "Running Low",
}
