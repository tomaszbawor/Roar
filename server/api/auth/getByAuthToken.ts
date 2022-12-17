import { eventHandler, getCookie } from "h3";
import { IUser } from "~/types/IUser";
import { Maybe } from "~/types/util";
import { getUserBySessionToken } from "~/server/services/sessionService";

export default eventHandler<Maybe<IUser>>(async (event) => {
  const authToken = getCookie(event, "auth_token");
  if (!authToken) {
    return null;
  }

  return await getUserBySessionToken(authToken);
});
