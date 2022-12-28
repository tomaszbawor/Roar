import { eventHandler } from "h3";
import { Maybe } from "~/utils/Maybe";
import {
  createArenaBattle,
  StartArenaBattleCommand,
} from "~/server/services/battleService";
import { getCharacterById } from "~/server/repositories/characterRepository";
import { getArenaCharacterById } from "~/server/repositories/arenaCharacterRepository";
import { IBattle } from "~/types/battle/IBattle";
import {
  sendApiError,
  sendApiErrorOnFalseCondition,
  sendApiErrorOnNull,
} from "~/server/api/apiErrorsUtil";

export default eventHandler<Maybe<IBattle>>(async (event) => {
  const body = await readBody<StartArenaBattleCommand>(event);
  const char = await getCharacterById(body.characterId);

  sendApiErrorOnNull(
    char,
    event,
    404,
    `Character with id ${body.characterId} not found`
  );
  sendApiErrorOnFalseCondition(
    !char.isInBattle,
    event,
    400,
    `Character with id ${body.characterId} is already in battle`
  );

  const ai = await getArenaCharacterById(body.arenaCharacterId);

  sendApiErrorOnNull(
    ai,
    event,
    404,
    `Arena character with id ${body.arenaCharacterId} not found`
  );

  try {
    return await createArenaBattle(ai, char);
  } catch (e) {
    sendApiError(event, 400, "Can not create battle");
  }
});
