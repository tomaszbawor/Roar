import { Injectable } from '@nestjs/common';
import {
  ArenaCharacter,
  ArenaCharacterId,
} from '@common/battle/ArenaCharacter';
import { Character, CharacterId } from '@common/Character';
import { PrismaService } from '../prisma/prisma.service';
import { ArenaBattle, Battle, BattleId } from '@common/battle/Battle';
import { ArenaService } from './arena/arena.service';
import { CharactersService } from '../characters/characters.service';

@Injectable()
export class BattleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly arenaService: ArenaService,
    private readonly charactersService: CharactersService,
  ) {}

  async startArenaBattle(
    characterId: CharacterId,
    arenaCharacterId: ArenaCharacterId,
  ) {
    const character: Character = await this.charactersService.getCharacterById(
      characterId,
    );
    const arenaCharacter: ArenaCharacter =
      await this.arenaService.getArenaCharacterById(arenaCharacterId);

    return await this.prisma.$transaction(async () => {
      const battle = await this.createBattle(character, arenaCharacter);
      await this.setCharacterAsInBattle(character, battle);
      return battle;
    });
  }

  async getArenaBattle(battleId: BattleId): Promise<ArenaBattle> {
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

  private setCharacterAsInBattle(character: Character, battle: Battle) {
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
}
