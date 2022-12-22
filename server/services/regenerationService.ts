import prisma from "~/server/database/client";
import { ICharacter } from "~/types/ICharacter";
import ICharacterPool from "~/types/ICharacterPool";
import { getRegenerationRateForCharacter } from "~/engine/character/characterRegen";

export const refreshPools = async () => {
  const characterWithNotFullPool = await getCharactersToRegenerate();

  for (const character of characterWithNotFullPool) {
    const regenRate = getRegenerationRateForCharacter(character);
    await prisma.characterPool.update({
      where: {
        characterId: character.id,
      },
      data: {
        health: updateOrMax(
          character.characterPool!.health,
          character.characterPool!.maxHealth,
          regenRate
        ),
        stamina: updateOrMax(
          character.characterPool!.stamina,
          character.characterPool!.maxStamina,
          regenRate
        ),
        chakra: updateOrMax(
          character.characterPool!.chakra,
          character.characterPool!.maxChakra,
          regenRate
        ),
      },
    });
  }
};

const getCharactersToRegenerate = async (): Promise<Array<ICharacter>> => {
  //TODO: Use native query to select characters with pools that are not max
  const allCharacters: Array<ICharacter> = await prisma.character.findMany({
    include: {
      characterPool: true,
    },
  });

  return allCharacters.filter((character) => {
    const pool: ICharacterPool = character.characterPool!;
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
