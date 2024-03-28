export interface User {
  firstName: string;
  lastName: string;
  email: string;
  notifications: boolean;
  role: Role;
}

export type Role = "client" | "admin";
