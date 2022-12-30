import prisma from "~/server/database/client";
import { Maybe } from "../../../common/utils/Maybe";
import { IBattle } from "../../../common/battle/IBattle";

export const getBattleById = async (
  battleId: string
): Promise<Maybe<IBattle>> => {
  return await prisma.battle.findUnique({
    where: {
      id: battleId,
    },
    include: {
      aiDefender: true,
      battleLog: true,
    },
  });
};
