import { Injectable } from '@nestjs/common';
import {
  ArenaCharacter,
  ArenaCharacterId,
} from '@common/battle/ArenaCharacter';
import { Character, CharacterId } from '@common/Character';
import { PrismaService } from '../prisma/prisma.service';
import { BattleId, IBattle } from '@common/battle/IBattle';
import { ArenaService } from './arena/arena.service';

@Injectable()
export class BattleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly arenaService: ArenaService,
  ) {}

  async startArenaBattle(
    characterId: CharacterId,
    arenaCharacterId: ArenaCharacterId,
  ) {
    const character: Character = await this.getCharacterById(characterId);
    const arenaCharacter: ArenaCharacter =
      await this.arenaService.getArenaCharacterById(arenaCharacterId);

    return await this.prisma.$transaction(async () => {
      const battle = await this.createBattle(character, arenaCharacter);
      await this.setCharacterAsInBattle(character, battle);
      return battle;
    });
  }

  async getBattle(battleId: BattleId): Promise<IBattle> {
    return await this.prisma.battle.findUnique({
      where: {
        id: battleId,
      },
      include: {
        battleLog: true,
        aiDefender: true,
      },
    });
  }

  private createBattle(character: Character, aiCharacter: ArenaCharacter) {
    return this.prisma.battle.create({
      data: {
        attackerId: character.id,
        defenderArenaCharacterId: aiCharacter.id,
        type: 'AI',
        attackerHealth: character.characterPool.health,
        attackerMaxHealth: character.characterPool.maxHealth,
        defenderHealth: aiCharacter.health,
        defenderMaxHealth: aiCharacter.health,
      },
      include: {
        battleLog: true,
      },
    });
  }

  private setCharacterAsInBattle(character: Character, battle: IBattle) {
    if (!character.characterPool) {
      throw new Error('Character pool not found');
    }
    return this.prisma.character.update({
      where: {
        id: character.id,
      },
      data: {
        isInBattle: true,
        currentBattleId: battle.id,
      },
    });
  }

  private async getCharacterById(id: CharacterId): Promise<Character> {
    return await this.prisma.character.findUnique({
      where: {
        id: id,
      },
      include: {
        characterPool: true,
      },
    });
  }
}
