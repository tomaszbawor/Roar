import prisma from "~/server/database/client";
import { ISession } from "../../../common/ISession";
import { Maybe } from "../../../common/utils/Maybe";
import { IUser } from "../../../common/IUser";

export async function createSession(data: ISession): Promise<ISession> {
  if (!data.authToken) {
    throw new Error("No auth token while creating session");
  }

  return await prisma.session.create({
    data: {
      userId: data.userId,
      authToken: data.authToken,
    },
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
        authToken: authToken,
      },
    })
    .user();
}
