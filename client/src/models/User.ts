export interface User {
  firstName: string;
  lastName: string;
  email: string;
  notifications: boolean;
  profileImageUrl: string;
  role: Role;
}

export type Role = "client" | "admin";
