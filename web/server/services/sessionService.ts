import { H3Event, setCookie } from "h3";
import { v4 as uuidv4 } from "uuid";
import { createSession, getSessionByAuthToken } from "~/server/repositories/sessionRepository";
import { saninizeUserForFrontend } from "~/server/services/userService";
import { User } from "../../../common/User";
import { Maybe } from "../../../common/utils/Maybe";

export async function makeSession(user: User, event: H3Event): Promise<User> {
  const authToken = uuidv4().replaceAll("-", "");
  const session = await createSession({ authToken, userId: user.id });

  const userId = session.userId;
  if (userId) {
    setCookie(event, "auth_token", authToken, { path: "/", httpOnly: true });
    const user = await getUserBySessionToken(authToken);
    if (!user) {
      throw Error("Could not get user by session token");
    }
    return user;
  }
  throw Error("Error creating session");
}

export async function getUserBySessionToken(
  authToken: string
): Promise<Maybe<User>> {
  try {
    const session = await getSessionByAuthToken(authToken);
    return saninizeUserForFrontend(session.user);
  } catch (e) {
    console.log(e);
    return null;
  }
}
