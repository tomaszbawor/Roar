import { eventHandler } from "h3";
import { Maybe } from "~/utils/Maybe";
import { IBattle } from "~/types/battle/IBattle";
import { getBattleById } from "~/server/repositories/battleRepository";
import { sendApiErrorOnNull } from "~/server/api/apiErrorsUtil";

export default eventHandler<Maybe<IBattle>>(async (event) => {
  // Get battle id from path
  const query = getQuery(event);
  const battleId = query.battleId as string;
  sendApiErrorOnNull(battleId, event, 400, "Battle id is not provided");

  const battle = await getBattleById(battleId);
  sendApiErrorOnNull(
    battle,
    event,
    400,
    `Battle with id ${battleId} not found`
  );

  return battle;
});
