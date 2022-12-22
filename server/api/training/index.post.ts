import { TrainCommand } from "~/types/form/TrainCommand";
import { getCookie } from "h3";
import { getUserBySessionToken } from "~/server/services/sessionService";

export default defineEventHandler<any>(async (event) => {
  const body = await readBody<TrainCommand>(event);
  const authToken = getCookie(event, "auth_token");
  if (!authToken) {
    return null;
  }
  const user = await getUserBySessionToken(authToken);

  //TODO: Implement
});
