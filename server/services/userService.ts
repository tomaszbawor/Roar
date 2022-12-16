import { getUserByEmail } from "~/server/repositories/userRepository";
import { IUser } from "~/types/IUser";

export async function doesUserExist(email: string): Promise<boolean> {
  const user = await getUserByEmail(email);

  return !!user;
}

export function saninizeUserForFrontend(user: IUser | undefined): IUser {
  if (!user) {
    return user;
  }

  delete user.password;

  return user;
}
