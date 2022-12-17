import { ISession } from "~/types/ISession";
import prisma from "~/server/database/client";
import { IUser } from "~/types/IUser";
import { Maybe } from "~/utils/Maybe";

export async function createSession(data: ISession): Promise<ISession> {
  return await prisma.session.create({
    data: {
      userId: data.userId,
      authToken: data.authToken!
    }
  });
}

export async function getSessionByAuthToken(
  authToken: string
): Promise<ISession> {
  const user = await getUserByAuthToken(authToken);
  if (!user) {
    throw Error(`No session for token : ${authToken}`);
  }
  return { authToken, user, userId: user.id };
}

async function getUserByAuthToken(authToken: string): Promise<Maybe<IUser>> {
  return prisma.session
    .findUnique({
      where: {
        authToken: authToken
      }
    })
    .user();
}
