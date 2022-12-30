import { IUserRole } from "./IUserRole";

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: IUserRole;
}

export type CreateUserRequest = Pick<IUser, "email" | "password">;
