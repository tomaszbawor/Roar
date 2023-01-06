import { SkillSkeleton, SkillSkeletonId } from '../Skills';
import { ArenaCharacterId } from './ArenaCharacter';

export interface ArenaCharacterSkill {
  skillSkeleton: SkillSkeleton;
  skillSkeletonId: SkillSkeletonId;
  arenaCharacterId: ArenaCharacterId;
}