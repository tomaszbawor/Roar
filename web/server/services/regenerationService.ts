import prisma from "~/server/database/client";
import { getRegenerationRateForCharacter } from "../../../common/engine/character/characterRegen";
import { Character } from "../../../common/Character";

export const refreshPools = async () => {
  const characterWithNotFullPool = await getCharactersToRegenerate();

  for (const character of characterWithNotFullPool) {
    const regenRate = getRegenerationRateForCharacter(character);
    const pool = character.characterPool;

    if (!pool) {
      throw Error("Character does not have a resource pool");
    }

    await prisma.characterPool.update({
      where: {
        characterId: character.id
      },
      data: {
        health: updateOrMax(pool.health, pool.maxHealth, regenRate),
        stamina: updateOrMax(pool.stamina, pool.maxStamina, regenRate),
        chakra: updateOrMax(pool.chakra, pool.maxChakra, regenRate)
      }
    });
  }
};

const getCharactersToRegenerate = async (): Promise<Array<Character>> => {
  //TODO: Use native query to select characters with pools that are not max
  const allCharacters: Array<Character> = await prisma.character.findMany({
    where: {
      isInBattle: false
    },
    include: {
      characterPool: true
    }
  });

  return allCharacters.filter((character) => {
    const pool = character.characterPool;
    if (!pool) {
      return false;
    }
    return (
      pool.health < pool.maxHealth ||
      pool.stamina < pool.maxStamina ||
      pool.chakra < pool.maxChakra
    );
  });
};

const updateOrMax = (old: number, max: number, increse: number): number => {
  return old + increse <= max ? old + increse : max;
};
