import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  ArenaCharacter,
  ArenaCharacterId,
} from '@common/battle/ArenaCharacter';
import { OwnedSkill, SkillSkeletonId } from '@common/Skills';
import { Character, CharacterId } from '@common/Character';
import { Battle, BattleId } from '@common/battle/Battle';
import { CharactersService } from '../../characters/characters.service';
import { BattleService } from '../battle.service';
import {
  calculate,
  DamageResult,
  ownedSkillToAttackSkill,
} from '@common/engine/battle/DamageCalculator';
import { ArenaCharacterSkill } from '@common/battle/ArenaCharacterSkill';
import { BattleResult } from '@common/enums/BattleResult';
import { Maybe } from '@common/utils/Maybe';

@Injectable()
export class ArenaService {
  private readonly logger = new Logger(ArenaService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly charService: CharactersService,
    @Inject(forwardRef(() => BattleService))
    private readonly battleService: BattleService,
  ) {}

  async getArenaCharacterById(
    arenaCharId: ArenaCharacterId,
  ): Promise<ArenaCharacter> {
    const arenaCharacter = await this.prisma.arenaCharacter.findUnique({
      where: {
        id: arenaCharId,
      },
    });

    if (!arenaCharacter) {
      throw new NotFoundException(
        `Arena character with id: ${arenaCharId} not found`,
      );
    }

    return arenaCharacter;
  }

  async getArenaMonsters(): Promise<Array<ArenaCharacter>> {
    // TODO: This will return only the one availible for user
    return this.prisma.arenaCharacter.findMany({
      where: {
        active: true,
      },
    });
  }

  async makeBattleAction(
    characterId: CharacterId,
    skillId: SkillSkeletonId,
    battleId: BattleId,
  ) {
    this.logger.debug(`Action performed: ${skillId} for battle: ${battleId}`);
    const char = await this.charService.getCharacterById(characterId);

    if (!char.isInBattle) {
      throw new BadRequestException('Character is not in battle');
    }

    if (char.currentBattleId != battleId) {
      throw new BadRequestException(
        'Wrong battle request, character is in another battle',
      );
    }

    const battle = await this.battleService.getArenaBattle(battleId);
    const skillUsedByCharacter = await this.charService.getCharacterSkill(
      characterId,
      skillId,
    );
    const skillUsedByAi = await this.getAiSkill(
      battle.defenderArenaCharacterId,
      battle.turn,
    );

    const characterDamageResult = calculate(
      char,
      battle.aiDefender,
      ownedSkillToAttackSkill(skillUsedByCharacter),
    );

    const aiDamageResult = calculate(
      battle.aiDefender,
      char,
      ownedSkillToAttackSkill(skillUsedByAi),
    );

    const newDefenderHealth =
      battle.defenderHealth - characterDamageResult.value;
    const newCharacterHealth = char.characterPool.health - aiDamageResult.value;

    const arenaCharDied = newDefenderHealth <= 0;
    const characterDied = newCharacterHealth <= 0;

    let result: Maybe<BattleResult> = null;
    if (arenaCharDied && characterDied) {
      result = 'TIE';
    } else if (arenaCharDied && !characterDied) {
      result = 'ATTACKER_WIN';
    } else if (!arenaCharDied && characterDied) {
      result = 'DEFENDER_WIN';
    }

    return await this.battleTurn(
      char,
      battle,
      characterDamageResult,
      skillUsedByCharacter,
      aiDamageResult,
      skillUsedByAi,
      result,
    );
  }

  private async finishArenaBattle(
    battleId: BattleId,
    characterId: CharacterId,
    battleResult: BattleResult,
  ) {
    this.logger.warn('Battle finished ');
    await this.prisma.battle.update({
      where: {
        id: battleId,
      },
      data: {
        state: 'FINISHED',
        battleResult: battleResult,
      },
    });
    // TODO: Rewards for battle
    await this.charService.finishCharacterBattle(characterId);
    // TODO: Increase stats for used skills
  }

  private async battleTurn(
    character: Character,
    battle: Battle,
    charDamage: DamageResult,
    charSkill: OwnedSkill,
    aiDamage: DamageResult,
    aiSkill: ArenaCharacterSkill,
    battleResult: Maybe<BattleResult>,
  ) {
    let damageDealtToAi = 0;
    let damageDealtToCharacter = 0;

    switch (battleResult) {
      case null: {
        damageDealtToAi = charDamage.value;
        damageDealtToCharacter = aiDamage.value;
        break;
      }
      case 'ATTACKER_WIN': {
        damageDealtToAi = battle.defenderHealth;
        damageDealtToCharacter = aiDamage.value;
        break;
      }
      case 'DEFENDER_WIN': {
        damageDealtToAi = charDamage.value;
        damageDealtToCharacter = character.characterPool.health;
        break;
      }
      case 'TIE': {
        damageDealtToAi = battle.defenderHealth;
        damageDealtToCharacter = character.characterPool.health;
        break;
      }
    }

    await this.prisma.battle.update({
      where: {
        id: battle.id,
      },
      data: {
        defenderHealth: {
          decrement: damageDealtToAi,
        },
        turn: {
          increment: 1,
        },
        battleLog: {
          upsert: {
            where: {
              battleId_turn: {
                battleId: battle.id,
                turn: battle.turn,
              },
            },
            update: {
              attackerSkillId: charSkill.skillSkeletonId,
              defenderSkillId: aiSkill.skillSkeletonId,
              attackerLog: charSkill.skillSkeleton.battleLogAction,
              attackerDamage: charDamage.value,
              defenderLog: aiSkill.skillSkeleton.battleLogAction,
              defenderDamage: aiDamage.value,
            },
            create: {
              turn: battle.turn,
              attackerSkillId: charSkill.skillSkeletonId,
              defenderSkillId: aiSkill.skillSkeletonId,
              attackerLog: charSkill.skillSkeleton.battleLogAction,
              attackerDamage: charDamage.value,
              defenderLog: aiSkill.skillSkeleton.battleLogAction,
              defenderDamage: aiDamage.value,
            },
          },
        },
      },
    });
    // make char damage
    await this.prisma.characterPool.update({
      where: {
        characterId: battle.attackerId,
      },
      data: {
        health: {
          decrement: damageDealtToCharacter,
        },
      },
    });

    if (battleResult) {
      await this.finishArenaBattle(battle.id, battle.attackerId, battleResult);
    }
  }

  private async getAiSkill(
    arenaCharId: ArenaCharacterId,
    turn: number,
  ): Promise<ArenaCharacterSkill> {
    const skills: Array<ArenaCharacterSkill> =
      await this.prisma.arenaCharacterSkill.findMany({
        where: {
          arenaCharacterId: arenaCharId,
        },
        include: {
          skillSkeleton: true,
        },
      });

    // TODO: Logic to pick what skill should be used by arena char
    if (skills.length === 0) {
      throw new BadRequestException('Arena character has no skills!');
    }

    // pick skills in order of array
    return skills[turn % skills.length];
  }
}
