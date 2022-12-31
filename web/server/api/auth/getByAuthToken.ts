import { eventHandler, getCookie } from "h3";

import { getUserBySessionToken } from "~/server/services/sessionService";
import { Maybe } from "../../../../common/utils/Maybe";
import { User } from "../../../../common/User";


export default eventHandler<Maybe<User>>(async (event) => {
  const authToken = getCookie(event, "auth_token");
  if (!authToken) {
    return null;
  }

  return await getUserBySessionToken(authToken);
});
