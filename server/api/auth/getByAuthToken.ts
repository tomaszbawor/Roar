import { eventHandler, getCookie } from "h3";
import { IUser } from "~/types/IUser";
import { Nullable } from "~/types/util";
import { getUserBySessionToken } from "~/server/services/sessionService";

export default eventHandler<Nullable<IUser>>(async (event) => {
  const authToken = getCookie(event, "auth_token");
  if (!authToken) {
    return null;
  }

  const user = await getUserBySessionToken(authToken);
  return user;
});
