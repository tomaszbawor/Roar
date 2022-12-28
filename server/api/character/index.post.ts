import { Maybe } from "~/utils/Maybe";
import { CreateCharacterCommand, ICharacter } from "~/types/ICharacter";
import { getCookie, readBody } from "h3";
import { getUserBySessionToken } from "~/server/services/sessionService";
import { createCharacter } from "~/server/repositories/characterRepository";
import { sendApiErrorOnNull } from "~/server/api/apiErrorsUtil";

export default defineEventHandler<Maybe<ICharacter>>(async (event) => {
  const body = await readBody(event);

  const authToken = getCookie(event, "auth_token");
  if (!authToken) {
    return null;
  }

  const user = await getUserBySessionToken(authToken);
  sendApiErrorOnNull(
    user,
    event,
    400,
    "No auth token while creating character"
  );

  const createCharacterCommand: CreateCharacterCommand = {
    userId: user.id,
    name: body.name,
    village: body.village,
  };

  return await createCharacter(createCharacterCommand);
});
