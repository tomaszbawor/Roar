import { Maybe } from "~/utils/Maybe";
import { IBattle } from "~/types/battle/IBattle";
import prisma from "~/server/database/client";

export const getBattleById = async (
  battleId: string
): Promise<Maybe<IBattle>> => {
  return await prisma.battle.findUnique({
    where: {
      id: battleId,
    },
    include: {
      aiDefender: true,
    },
  });
};
