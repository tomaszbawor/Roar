import { Injectable } from '@nestjs/common';
import { Character, CharacterRank } from '@common/Character';
import { Maybe } from '@common/utils/Maybe';
import { maxExpForLevel } from '@common/engine/maxExpForLevel';
import { PrismaService } from '../prisma/prisma.service';
import { characterBaseRegenRates } from '@common/engine/character/characterRegen';

interface CapUpgrades {
  maxChakra: number;
  maxStamina: number;
  maxHealth: number;
}

@Injectable()
export class LevelUpService {
  constructor(private readonly prisma: PrismaService) {}

  async checkForLevelUp(character: Character): Promise<Character> {
    const foundCharacter: Maybe<Character> =
      await this.prisma.character.findUnique({
        where: {
          id: character.id,
        },
        include: {
          characterPool: true,
        },
      });

    if (!foundCharacter) {
      throw new Error('Character not found');
    }
    if (!foundCharacter.characterPool) {
      throw new Error('Character pool not found');
    }

    if (
      foundCharacter.characterPool.experience <
      maxExpForLevel(foundCharacter.characterPool.level)
    ) {
      return foundCharacter;
    } else {
      const upgrades = this.getCapUpgradesOnLevelUp(foundCharacter);
      return await this.prisma.character.update({
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
  }

  getCapUpgradesOnLevelUp(character: Character): CapUpgrades {
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
        maxChakra:
          characterBaseRegenRates.GENIN * minutesOfBaseRegenAfterLevelUp,
        maxStamina:
          characterBaseRegenRates.GENIN * minutesOfBaseRegenAfterLevelUp,
        maxHealth:
          characterBaseRegenRates.GENIN * minutesOfBaseRegenAfterLevelUp,
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
        maxChakra:
          characterBaseRegenRates.JONIN * minutesOfBaseRegenAfterLevelUp,
        maxStamina:
          characterBaseRegenRates.JONIN * minutesOfBaseRegenAfterLevelUp,
        maxHealth:
          characterBaseRegenRates.JONIN * minutesOfBaseRegenAfterLevelUp,
      },
    };

    return upgrades[character.rank];
  }
}
