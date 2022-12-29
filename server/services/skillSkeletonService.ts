import prisma from "~/server/database/client";
import { SkillType } from "~/types/skills/SkillType";
import { CharacterRank } from "~/types/ICharacter";
import { SkillElement } from "~/types/enums/SkillElement";
import { Maybe } from "~/utils/Maybe";
import { Village } from "~/types/enums/Village";

export const createBaseSkill = async (
  createCommand: CreateBaseSkillCommand
) => {
  //TODO: Validate if skills add ups to 100
  //TODO: Validate if stats add ups to 100
  //OPTIONAL: TODO: Validate if base power is not 0 and matches max base power for rank

  await prisma.skillSkeleton.create({
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
