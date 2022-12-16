import { IUser } from "~/types/IUser";
import { H3Event, setCookie } from "h3";
import { v4 as uuidv4 } from "uuid";
import {
  createSession,
  getSessionByAuthToken,
} from "~/server/repositories/sessionRepository";
import { saninizeUserForFrontend } from "~/server/services/userService";

export async function makeSession(user: IUser, event: H3Event): Promise<IUser> {
  const authToken = uuidv4().replaceAll("-", "");
  const session = await createSession({ authToken, userId: user.id });

  const userId = session.userId;
  if (userId) {
    setCookie(event, "auth_token", authToken, { path: "/", httpOnly: true });
    return getUserBySessionToken(authToken);
  }
  throw Error("Error creating session");
}

export async function getUserBySessionToken(authToken: string): Promise<IUser> {
  const session = await getSessionByAuthToken(authToken);
  return saninizeUserForFrontend(session.user);
}
