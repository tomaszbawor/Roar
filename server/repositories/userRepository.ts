import { IUser } from "~/types/IUser";
import prisma from "~/server/database/prisma/client";

export async function getUserByEmail(email: string): Promise<IUser | null> {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });
}

export async function createUser(data: IUser) {
  const user = prisma.user.create({
    data: {
      email: data.email,
      name: "DUPA",
      password: data.password,
    },
  });
  return user;
}