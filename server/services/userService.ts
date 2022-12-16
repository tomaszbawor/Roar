import { getUserByEmail } from "~/server/repositories/userRepository";
import { IUser } from "~/types/IUser";

export async function doesUserExist(email: string): Promise<boolean> {
  const user = await getUserByEmail(email);

  return !!user;
}

export function saninizeUserForFrontend(
  user: IUser | undefined
): IUser | undefined {
  if (!user) {
    return user;
  }

  user.password = "<hidden>";

  return user;
}
