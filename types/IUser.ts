import { IUserRole } from "~/types/IUserRole";

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: IUserRole;
}
