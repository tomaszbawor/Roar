import { UserRole } from "./UserRole";

export type UserId = string;

export interface User {
  id: UserId;
  email: string;
  password: string;
  role: UserRole;
}

export type CreateUserRequest = Pick<User, "email" | "password">;
