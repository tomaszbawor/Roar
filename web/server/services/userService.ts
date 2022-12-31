import { User } from "../../../common/User";
import { getUserByEmail } from "../repositories/userRepository";

export async function doesUserExist(email: string): Promise<boolean> {
  const user = await getUserByEmail(email);

  return !!user;
}

export function saninizeUserForFrontend(
  user: User | undefined
): User | undefined {
  if (!user) {
    return user;
  }

  user.password = "<hidden>";

  return user;
}
