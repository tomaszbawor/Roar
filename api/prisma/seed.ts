import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { SkillType } from '@common/Skills';
import { CharacterRank } from '@common/Character';
import { Maybe } from '@common/utils/Maybe';
import { SkillElement } from '@common/enums/SkillElement';
import { Village } from '@common/enums/Village';

(async () => {
  const prisma = new PrismaClient();

  async function seed() {
    // Create basic skill for all users
    const basicSkill = await createSkill({
      name: 'Basic Attack',
      description: 'Basic attack using all of your potential',
      skillType: 'TAIJUTSU',
      skillRank: 'STUDENT',
      staminaCost: 5,
      chakraCost: 5,
      cooldown: 0,
      battleLogAction: '{ATTACKER} attacks {DEFENDER} with all of their might',
      basePower: 1,
      genjutsuPercentRatio: 25,
      taijutsuPercentRatio: 25,
      ninjutsuPercentRatio: 25,
      bukijutsuPercentRatio: 25,
      speedPercentRatio: 25,
      intelligencePercentRatio: 25,
      strengthPercentRatio: 25,
      endurancePercentRatio: 25,
      element: null,
      village: null,
    });
    // Create Test users
    await createAdmin(basicSkill.id);
    await createMod(basicSkill.id);
    await createUser(basicSkill.id);
    await createAi(basicSkill.id);
  }

  const createAdmin = async (skillId: string) => {
    const admin = await prisma.user.create({
      data: {
        email: 'admin@admin.com',
        password: await hashPassword('admin'),
        role: 'ADMIN',
        name: 'RoarAdmin',
      },
    });

    const char = await prisma.character.create({
      data: {
        name: 'Kami',
        userId: admin.id,
        village: 'MIST',
        ownedSkills: {
          create: {
            skillSkeletonId: skillId,
          },
        },
      },
    });

    await prisma.characterPool.create({
      data: {
        characterId: char.id,
      },
    });
  };
  const createMod = async (skillId: string) => {
    const moderator = await prisma.user.create({
      data: {
        email: 'mod@mod.com',
        password: await hashPassword('mod'),
        role: 'MOD',
        name: 'RoarModerator',
      },
    });

    const char = await prisma.character.create({
      data: {
        name: 'Moderator',
        userId: moderator.id,
        village: 'MIST',
        ownedSkills: {
          create: {
            skillSkeletonId: skillId,
          },
        },
      },
    });

    await prisma.characterPool.create({
      data: {
        characterId: char.id,
      },
    });
  };
  const createUser = async (skillId: string) => {
    const user = await prisma.user.create({
      data: {
        email: 'user@user.com',
        password: await hashPassword('user'),
        role: 'MOD',
        name: 'RoarUser',
      },
    });

    const char = await prisma.character.create({
      data: {
        name: 'User',
        userId: user.id,
        village: 'MIST',
        ownedSkills: {
          create: {
            skillSkeletonId: skillId,
          },
        },
      },
    });

    await prisma.characterPool.create({
      data: {
        characterId: char.id,
      },
    });
  };

  const createAi = async (skillId: string) => {
    await prisma.arenaCharacter.create({
      data: {
        name: 'Training Dummy',
        skills: {
          create: {
            skillSkeletonId: skillId,
          },
        },
        currencyGain: 10,
      },
    });
    await prisma.arenaCharacter.create({
      data: {
        name: 'Strong character',
        health: 100000,
        strength: 100,
        endurance: 100,
        intelligence: 100,
        speed: 100,
        offensiveNinjutsu: 10000,
        defensiveNinjutsu: 10000,
        offensiveTaijutsu: 10000,
        defensiveTaijutsu: 10000,
        offensiveGenjutsu: 10000,
        defensiveGenjutsu: 10000,
        offensiveBukijutsu: 10000,
        defensiveBukijutsu: 10000,
        skills: {
          create: {
            skillSkeletonId: skillId,
          },
        },
      },
    });
  };

  const createSkill = async (createCommand: CreateBaseSkillCommand) => {
    return await prisma.skillSkeleton.create({
      data: {
        name: createCommand.name,
        description: createCommand.description,
        type: createCommand.skillType,
        skillRank: createCommand.skillRank,
        staminaCost: createCommand.staminaCost,
        chakraCost: createCommand.chakraCost,
        cooldown: createCommand.cooldown,
        battleLogAction: createCommand.battleLogAction,
        element: createCommand.element,
        genjutsuPercentRatio: createCommand.genjutsuPercentRatio,
        ninjutsuPercentRatio: createCommand.ninjutsuPercentRatio,
        taijutsuPercentRatio: createCommand.taijutsuPercentRatio,
        bukijutsuPercentRatio: createCommand.bukijutsuPercentRatio,
        speedPercentRatio: createCommand.speedPercentRatio,
        endurancePercentRatio: createCommand.endurancePercentRatio,
        strengthPercentRatio: createCommand.strengthPercentRatio,
        intelligencePercentRatio: createCommand.intelligencePercentRatio,
        villageBasis: createCommand.village,
      },
    });
  };

  const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };

  try {
    await seed();
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
})();

export interface CreateBaseSkillCommand {
  name: string;
  description: string;
  skillType: SkillType;
  skillRank: CharacterRank;
  staminaCost: number;
  chakraCost: number;
  cooldown: number;
  battleLogAction: string;
  basePower: number; // default 1
  genjutsuPercentRatio: number;
  taijutsuPercentRatio: number;
  ninjutsuPercentRatio: number;
  bukijutsuPercentRatio: number;
  speedPercentRatio: number;
  intelligencePercentRatio: number;
  strengthPercentRatio: number;
  endurancePercentRatio: number;
  element: Maybe<SkillElement>; // default "NONE"
  village: Maybe<Village>; // default "NONE"
}
