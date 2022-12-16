import { getUserByEmail } from "~/server/repositories/userRepository";

export async function doesUserExist(email: string): Promise<boolean> {
  const user = await getUserByEmail(email);

  return !!user;
}
