import { eventHandler, getCookie } from "h3";
import { IUser } from "~/types/IUser";
import { getUserBySessionToken } from "~/server/services/sessionService";

export default eventHandler<IUser>(async (event) => {
  const authToken = getCookie(event, "auth_token");
  const user = await getUserBySessionToken(authToken);

  return user;
});
