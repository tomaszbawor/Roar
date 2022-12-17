import { getQuery } from "h3";
import { getCharacterByUserId } from "~/server/repositories/characterRepository";
import { ICharacter } from "~/types/ICharacter";
import { Maybe } from "~/utils/Maybe";

export default defineEventHandler<Maybe<ICharacter>>(async (event) => {
  const query = await getQuery(event);
  const userId = query.userId as string;

  return await getCharacterByUserId(userId);
});
