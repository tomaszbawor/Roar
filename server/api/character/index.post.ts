import { Maybe } from "~/utils/Maybe";
import { CreateCharacterCommand, ICharacter } from "~/types/ICharacter";
import { getCookie, readBody, sendError } from "h3";
import { getUserBySessionToken } from "~/server/services/sessionService";
import { createCharacter } from "~/server/repositories/characterRepository";

export default defineEventHandler<Maybe<ICharacter>>(async (event) => {
  const body = await readBody(event);

  const authToken = getCookie(event, "auth_token");
  if (!authToken) {
    return null;
  }

  const user = await getUserBySessionToken(authToken);
  if (!user) {
    sendError(
      event,
      createError({
        statusCode: 400,
        message: "No auth token while creating character",
      })
    );
    return;
  }

  const createCharacterCommand: CreateCharacterCommand = {
    userId: user.id,
    name: body.name,
    village: body.village,
  };

  return await createCharacter(createCharacterCommand);
});
