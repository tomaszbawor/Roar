import prisma from "~/server/database/client";
import { Session } from "../../../common/Session";
import { Maybe } from "../../../common/utils/Maybe";
import { User } from "../../../common/User";

export async function createSession(data: Session): Promise<Session> {
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
): Promise<Session> {
  const user = await getUserByAuthToken(authToken);
  if (!user) {
    throw Error(`No session for token : ${authToken}`);
  }
  return { authToken, user, userId: user.id };
}

async function getUserByAuthToken(authToken: string): Promise<Maybe<User>> {
  return prisma.session
    .findUnique({
      where: {
        authToken: authToken,
      },
    })
    .user();
}
