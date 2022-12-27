import { eventHandler } from "h3";
import { Maybe } from "~/utils/Maybe";
import { IBattle } from "~/types/battle/IBattle";
import { getBattleById } from "~/server/repositories/battleRepository";

export default eventHandler<Maybe<IBattle>>(async (event) => {
  // Get battle id from path
  const query = getQuery(event);
  const battleId = query.battleId as string;

  if (!battleId) {
    sendError(
      event,
      createError({
        statusCode: 400,
        data: {
          message: `Battle id is not provided`,
        },
      })
    );
    return;
  }
  const battle = await getBattleById(battleId);
  if (!battle) {
    sendError(
      event,
      createError({
        statusCode: 404,
        data: {
          message: `Battle with id ${battleId} not found`,
        },
      })
    );
    return;
  }
  return battle;
});
