import prisma from "~/server/database/client";
import { ArenaCharacter } from "../../../common/battle/ArenaCharacter";
import { Character, CharacterId } from "../../../common/Character";
import { IBattle } from "../../../common/battle/IBattle";
import { Maybe } from "../../../common/utils/Maybe";

export const createArenaBattle = async (
  aiCharacter: ArenaCharacter,
  character: Character
): Promise<Maybe<IBattle>> => {
  return await prisma.$transaction(async () => {
    const battle = await createBattle(character, aiCharacter);
    await setCharacterAsInBattle(character, battle);
    return battle;
  });
};

async function setCharacterAsInBattle(character: Character, battle: IBattle) {
  if (!character.characterPool) {
    throw new Error("Character pool not found");
  }
  return prisma.character.update({
    where: {
      id: character.id
    },
    data: {
      isInBattle: true,
      currentBattleId: battle.id
    }
  });
}

async function createBattle(
  character: Character,
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
      defenderMaxHealth: aiCharacter.health
    },
    include: {
      battleLog: true
    }
  });
}

export interface StartArenaBattleCommand {
  arenaCharacterId: string;
  characterId: CharacterId;
}
