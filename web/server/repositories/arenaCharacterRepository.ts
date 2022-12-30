import prisma from "~/server/database/client";
import { Maybe } from "../../../common/utils/Maybe";
import { ArenaCharacter } from "../../../common/battle/ArenaCharacter";

export const getArenaCharacterById = async (
  id: string
): Promise<Maybe<ArenaCharacter>> => {
  return await prisma.arenaCharacter.findUnique({
    where: {
      id: id,
    },
  });
};
