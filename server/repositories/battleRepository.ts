import { Maybe } from "~/utils/Maybe";
import { ArenaCharacter } from "~/types/battle/ArenaCharacter";
import { ICharacter } from "~/types/ICharacter";
import prisma from "~/server/database/client";
import { IBattle } from "~/types/battle/IBattle";

export const createArenaBattle = async (
  aiCharacter: ArenaCharacter,
  character: ICharacter
): Promise<Maybe<IBattle>> => {
  return await prisma.$transaction(async () => {
    await setCharacterAsInBattle(character);
    return await createBattle(character, aiCharacter);
  });
};

function setCharacterAsInBattle(character: ICharacter) {
  return prisma.character.update({
    where: {
      id: character.id,
    },
    data: {
      isInBattle: true,
    },
  });
}

async function createBattle(
  character: ICharacter,
  aiCharacter: ArenaCharacter
) {
  return prisma.battle.create({
    data: {
      attackerId: character.id,
      defenderArenaCharacterId: aiCharacter.id,
      type: "AI",
    },
  });
}
