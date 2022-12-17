import { readBody } from "h3";
import { getCharacterByUserId } from "~/server/repositories/characterRepository";
import { Maybe } from "~/types/util";
import { ICharacter } from "~/types/ICharacter";

export default defineEventHandler<Maybe<ICharacter>>(async (event) => {
  const body = await readBody(event);
  const userId = body.userId;

  return await getCharacterByUserId(userId);
});
