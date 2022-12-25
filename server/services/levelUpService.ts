import { CharacterRank, ICharacter } from "~/types/ICharacter";
import { Maybe } from "~/utils/Maybe";
import prisma from "~/server/database/client";
import { maxExpForLevel } from "~/engine/maxExpForLevel";
import { characterBaseRegenRates } from "~/engine/character/characterRegen";

export const checkForLevelUp = async (
  character: ICharacter
): Promise<ICharacter> => {
  const foundCharacter: Maybe<ICharacter> = await prisma.character.findUnique({
    where: {
      id: character.id,
    },
    include: {
      characterPool: true,
    },
  });

  if (!foundCharacter) {
    throw new Error("Character not found");
  }
  if (!foundCharacter.characterPool) {
    throw new Error("Character pool not found");
  }

  if (
    foundCharacter.characterPool.experience <
    maxExpForLevel(foundCharacter.characterPool.level)
  ) {
    return foundCharacter;
  } else {
    const upgrades = getCapUpgradesOnLevelUp(foundCharacter);
    return await prisma.character.update({
      where: {
        id: character.id,
      },
      data: {
        characterPool: {
          update: {
            experience: {
              decrement: maxExpForLevel(foundCharacter.characterPool.level),
            },
            level: {
              increment: 1,
            },
            maxStamina: {
              increment: upgrades.maxStamina,
            },
            maxHealth: {
              increment: upgrades.maxHealth,
            },
            maxChakra: {
              increment: upgrades.maxChakra,
            },
          },
        },
      },
      include: {
        characterPool: true,
      },
    });
  }
};

const getCapUpgradesOnLevelUp = (character: ICharacter): CapUpgrades => {
  const minutesOfBaseRegenAfterLevelUp = 30;
  const upgrades: Record<CharacterRank, CapUpgrades> = {
    STUDENT: {
      maxChakra:
        characterBaseRegenRates.STUDENT * minutesOfBaseRegenAfterLevelUp,
      maxStamina:
        characterBaseRegenRates.STUDENT * minutesOfBaseRegenAfterLevelUp,
      maxHealth:
        characterBaseRegenRates.STUDENT * minutesOfBaseRegenAfterLevelUp,
    },
    GENIN: {
      maxChakra: characterBaseRegenRates.GENIN * minutesOfBaseRegenAfterLevelUp,
      maxStamina:
        characterBaseRegenRates.GENIN * minutesOfBaseRegenAfterLevelUp,
      maxHealth: characterBaseRegenRates.GENIN * minutesOfBaseRegenAfterLevelUp,
    },
    CHUNIN: {
      maxChakra:
        characterBaseRegenRates.CHUNIN * minutesOfBaseRegenAfterLevelUp,
      maxStamina:
        characterBaseRegenRates.CHUNIN * minutesOfBaseRegenAfterLevelUp,
      maxHealth:
        characterBaseRegenRates.CHUNIN * minutesOfBaseRegenAfterLevelUp,
    },
    JONIN: {
      maxChakra: characterBaseRegenRates.JONIN * minutesOfBaseRegenAfterLevelUp,
      maxStamina:
        characterBaseRegenRates.JONIN * minutesOfBaseRegenAfterLevelUp,
      maxHealth: characterBaseRegenRates.JONIN * minutesOfBaseRegenAfterLevelUp,
    },
  };

  return upgrades[character.rank];
};

interface CapUpgrades {
  maxChakra: number;
  maxStamina: number;
  maxHealth: number;
}
