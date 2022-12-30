import { IUser } from "../../../common/IUser";
import { getUserByEmail } from "../repositories/userRepository";

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
