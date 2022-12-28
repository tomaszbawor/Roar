import { ArenaCharacter } from "~/types/battle/ArenaCharacter";
import { Maybe } from "~/utils/Maybe";
import prisma from "~/server/database/client";

export const getArenaCharacterById = async (
  id: string
): Promise<Maybe<ArenaCharacter>> => {
  return await prisma.arenaCharacter.findUnique({
    where: {
      id: id,
    },
  });
};
