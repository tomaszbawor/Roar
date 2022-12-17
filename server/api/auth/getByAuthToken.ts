import { eventHandler, getCookie } from "h3";
import { IUser } from "~/types/IUser";
import { getUserBySessionToken } from "~/server/services/sessionService";
import { Maybe } from "~/utils/Maybe";

export default eventHandler<Maybe<IUser>>(async (event) => {
  const authToken = getCookie(event, "auth_token");
  if (!authToken) {
    return null;
  }

  return await getUserBySessionToken(authToken);
});
