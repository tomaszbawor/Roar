import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { getRegenerationRateForCharacter } from '@common/engine/character/characterRegen';
import { Character } from '@common/Character';

@Injectable()
export class RegenCronService {
  private readonly logger = new Logger(RegenCronService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron('* * * * *')
  handleCron() {
    this.prisma.$transaction(async () => {
      const now = performance.now();
      await this.refreshPools();
      const after = performance.now();
      this.logger.debug(`Regenerate took ${after - now} ms`);
    });
  }

  async refreshPools() {
    const characterWithNotFullPool = await this.getCharactersToRegenerate();

    for (const character of characterWithNotFullPool) {
      const regenRate = getRegenerationRateForCharacter(character);
      const pool = character.characterPool;

      if (!pool) {
        throw Error('Character does not have a resource pool');
      }

      await this.prisma.characterPool.update({
        where: {
          characterId: character.id,
        },
        data: {
          health: this.updateOrMax(pool.health, pool.maxHealth, regenRate),
          stamina: this.updateOrMax(pool.stamina, pool.maxStamina, regenRate),
          chakra: this.updateOrMax(pool.chakra, pool.maxChakra, regenRate),
        },
      });
    }
  }

  async getCharactersToRegenerate(): Promise<Array<Character>> {
    //TODO: Use native query to select characters with pools that are not max
    const allCharacters: Array<Character> =
      await this.prisma.character.findMany({
        where: {
          isInBattle: false,
        },
        include: {
          characterPool: true,
        },
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
  }

  updateOrMax(old: number, max: number, increse: number): number {
    return old + increse <= max ? old + increse : max;
  }
}
