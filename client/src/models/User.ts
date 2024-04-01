export interface User {
  firstName: string;
  lastName: string;
  email: string;
  notifications: boolean;
  role: Role;
  ID?: string;
}

export type Role = "client" | "admin";
