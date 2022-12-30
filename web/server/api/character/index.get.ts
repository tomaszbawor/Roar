import { getQuery } from "h3";
import { getCharacterByUserId } from "~/server/repositories/characterRepository";
import { Maybe } from "../../../../common/utils/Maybe";
import { ICharacter } from "../../../../common/ICharacter";


export default defineEventHandler<Maybe<ICharacter>>(async (event) => {
  const query = await getQuery(event);
  const userId = query.userId as string;

  return await getCharacterByUserId(userId);
});
