import { User } from "./User";

export interface Session {
  authToken?: string;
  user?: User;
  userId: string;
}
