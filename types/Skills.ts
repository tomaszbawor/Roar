import { CharacterRank } from "~/types/ICharacter";
import { Village } from "~/types/enums/Village";
import { Element } from "~/engine/battle/Element";
import { Maybe } from "~/utils/Maybe";

export interface OwnedSkill {
  skillSkeleton: SkillSkeleton;
  skillSkeletonId: string;
  characterId: string; // character id of skill owner
  level: number;
  uses: number;
}

// base info for skill
export interface SkillSkeleton {
  id: SkillSkeletonId;
  name: string;
  type: SkillType;
  skillRank: CharacterRank;
  availableForAll: boolean;
  learnableSkill: boolean;
  villageSkill: boolean;
  villageBasis: Maybe<Village>;
  basePower: number;
  staminaCost: number;
  chakraCost: number;
  description: string;
  battleLogAction: string;
  genjustuPercentRatio: number;
  taijutsuPercentRatio: number;
  ninjutsuPercentRatio: number;
  bukijutsuPercentRatio: number;
  speedPercentRatio: number;
  intelligencePercentRatio: number;
  strengthPercentRatio: number;
  endurancePercentRatio: number;
  element: any | null; //TODO: FIX THIS
  cooldown: number;
}

export type SkillSkeletonId = string;

export type SkillType = "NINJUTSU" | "TAIJUTSU" | "GENJUTSU" | "BUKIJUTSU";



