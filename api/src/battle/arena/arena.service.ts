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
import { SkillSkeletonId } from '@common/Skills';
import { CharacterId } from '@common/Character';
import { BattleId } from '@common/battle/IBattle';
import { CharactersService } from '../../characters/characters.service';
import { BattleService } from '../battle.service';
import {
  calculate,
  ownedSkillToAttackSkill,
} from '@common/engine/battle/DamageCalculator';

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
    const usedSkill = await this.charService.getCharacterSkill(
      characterId,
      skillId,
    );

    const damage = calculate(
      char,
      battle.aiDefender,
      ownedSkillToAttackSkill(usedSkill),
    );
    const damageValue = damage.damage;

    if (battle.defenderHealth <= damageValue) {
      this.logger.warn('Battle finished ');
      await this.prisma.battle.update({
        where: {
          id: battle.id,
        },
        data: {
          state: 'FINISHED',
          defenderHealth: 0,
        },
      });

      await this.charService.finishCharacterBattle(characterId);
    } else {
      this.logger.warn('Battle must continue...');
      await this.prisma.battle.update({
        where: {
          id: battle.id,
        },
        data: {
          defenderHealth: {
            decrement: damageValue,
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
                attackerSkillId: skillId,
                attackerLog: usedSkill.skillSkeleton.battleLogAction, // Fill it and make template
                attackerDamage: damageValue,
              },
              create: {
                turn: battle.turn,
                attackerSkillId: skillId,
                attackerLog: usedSkill.skillSkeleton.battleLogAction,
                attackerDamage: damageValue,
              },
            },
          },
        },
      });
    }

    // check if attacker turn
  }
}
