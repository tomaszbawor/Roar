import { eventHandler, getCookie } from "h3";

import { getUserBySessionToken } from "~/server/services/sessionService";
import { Maybe } from "../../../../common/utils/Maybe";
import { IUser } from "../../../../common/IUser";


export default eventHandler<Maybe<IUser>>(async (event) => {
  const authToken = getCookie(event, "auth_token");
  if (!authToken) {
    return null;
  }

  return await getUserBySessionToken(authToken);
});
