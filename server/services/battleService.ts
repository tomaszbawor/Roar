import { ArenaCharacter } from "~/types/battle/ArenaCharacter";
import { Maybe } from "~/utils/Maybe";
import { CharacterId, ICharacter } from "~/types/ICharacter";
import { IBattle } from "~/types/battle/IBattle";
import prisma from "~/server/database/client";

export const createArenaBattle = async (
  aiCharacter: ArenaCharacter,
  character: ICharacter
): Promise<Maybe<IBattle>> => {
  return await prisma.$transaction(async () => {
    const battle = await createBattle(character, aiCharacter);
    await setCharacterAsInBattle(character, battle);
    return battle;
  });
};

async function setCharacterAsInBattle(character: ICharacter, battle: IBattle) {
  if (!character.characterPool) {
    throw new Error("Character pool not found");
  }
  return prisma.character.update({
    where: {
      id: character.id,
    },
    data: {
      isInBattle: true,
      currentBattleId: battle.id,
    },
  });
}

async function createBattle(
  character: ICharacter,
  aiCharacter: ArenaCharacter
) {
  if (!character.characterPool) {
    throw new Error("Character pool not found");
  }

  return prisma.battle.create({
    data: {
      attackerId: character.id,
      defenderArenaCharacterId: aiCharacter.id,
      type: "AI",
      attackerHealth: character.characterPool.health,
      attackerMaxHealth: character.characterPool.maxHealth,
      defenderHealth: aiCharacter.health,
      defenderMaxHealth: aiCharacter.health,
    },
  });
}

export interface StartArenaBattleCommand {
  arenaCharacterId: string;
  characterId: CharacterId;
}