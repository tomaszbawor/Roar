import { eventHandler } from "h3";
import { Maybe } from "~/utils/Maybe";
import {
  createArenaBattle,
  StartArenaBattleCommand,
} from "~/server/services/battleService";
import { getCharacterById } from "~/server/repositories/characterRepository";
import { getArenaCharacterById } from "~/server/repositories/arenaCharacterRepository";
import { IBattle } from "~/types/battle/IBattle";

export default eventHandler<Maybe<IBattle>>(async (event) => {
  const body = await readBody<StartArenaBattleCommand>(event);
  const char = await getCharacterById(body.characterId);

  if (!char) {
    sendError(
      event,
      createError({
        statusCode: 400,
        data: {
          message: `Character with id ${body.characterId} not found`,
        },
      })
    );
    return;
  }

  if (char.isInBattle) {
    sendError(
      event,
      createError({
        statusCode: 400,
        data: {
          message: "Character is already in battle",
        },
      })
    );
  }
  const ai = await getArenaCharacterById(body.arenaCharacterId);
  if (!ai) {
    sendError(
      event,
      createError({
        statusCode: 400,
        data: {
          message: `Can not get arena character with id: ${body.arenaCharacterId}`,
        },
      })
    );
    return;
  }

  try {
    return await createArenaBattle(ai, char);
  } catch (e) {
    sendError(
      event,
      createError({
        statusCode: 400,
        data: {
          message: `Can not create battle`,
        },
      })
    );
  }
});
