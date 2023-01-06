import { Character } from '../../Character';
import { ArenaCharacter } from '../../battle/ArenaCharacter';
import { Maybe } from '../../utils/Maybe';
import { GeneralStats, JutsuType } from '../training/trainingTypes';
import { OwnedSkill } from '../../Skills';
import { SkillElement } from '../../enums/SkillElement';
import { ArenaCharacterSkill } from '../../battle/ArenaCharacterSkill';


function calculateOffence(
  attacker: Character | ArenaCharacter,
  skill: AttackSkill,
) {
  const ninjutsu =
    attacker.offensiveNinjutsu * skill.attackCoefficients.NINJUTSU;
  const taijutsu =
    attacker.offensiveTaijutsu * skill.attackCoefficients.TAIJUTSU;
  const genjutsu =
    attacker.offensiveGenjutsu * skill.attackCoefficients.GENJUTSU;
  const bukijutsu =
    attacker.offensiveBukijutsu * skill.attackCoefficients.BUKIJUTSU;

  const totalOffence = ninjutsu + taijutsu + genjutsu + bukijutsu;
  return totalOffence;
}

function calculateDefence(
  defender: Character | ArenaCharacter,
  skill: AttackSkill,
) {
  const ninjutsu =
    defender.defensiveNinjutsu * skill.attackCoefficients.NINJUTSU;
  const taijutsu =
    defender.defensiveTaijutsu * skill.attackCoefficients.TAIJUTSU;
  const genjutsu =
    defender.defensiveGenjutsu * skill.attackCoefficients.GENJUTSU;
  const bukijutsu =
    defender.defensiveBukijutsu * skill.attackCoefficients.BUKIJUTSU;

  return ninjutsu + taijutsu + genjutsu + bukijutsu;
}

function calculateGeneralStats(
  attacker: Character | ArenaCharacter,
  skill: AttackSkill,
): number {
  const speed = attacker.speed * skill.attackGenerals.SPEED;
  const intelligence =
    attacker.intelligence * skill.attackGenerals.INTELLIGENCE;
  const strength = attacker.strength * skill.attackGenerals.STRENGTH;
  const endurance = attacker.endurance * skill.attackGenerals.ENDURANCE;

  return speed + intelligence + strength + endurance;
}

export const calculate = (
  attacker: Character | ArenaCharacter,
  defender: Character | ArenaCharacter,
  skill: AttackSkill,
): DamageResult => {
  const attackPower = Math.sqrt(skill.skillLevel * skill.skillBasePower);

  const userOffence = calculateOffence(attacker, skill);
  console.log('userOffence', userOffence);

  const userGenerals = calculateGeneralStats(attacker, skill);
  console.log('userGenerals', userGenerals);

  const targetDefence = calculateDefence(defender, skill);
  console.log('targetDefence', targetDefence);

  const targetGenerals = calculateGeneralStats(defender, skill);
  console.log('targetGenerals', targetGenerals);

  // Target scale to ensure that for weak opponents defence matters more
  const targetDefenceAfterScale = 350 * Math.pow(targetDefence, 0.48);
  console.log('targetDefenceAfterScale', targetDefenceAfterScale);

  const targetGeneralsAfterScale = 350 * Math.pow(targetGenerals, 0.48);
  console.log('targetGeneralsAfterScale', targetGeneralsAfterScale);

  // Calculate ratios
  const offenceToDefence = Math.pow(userOffence / targetDefenceAfterScale, 0.1);
  console.log('offenceToDefence', offenceToDefence);
  const generalToGeneral = Math.pow(
    userGenerals / targetGeneralsAfterScale,
    0.1,
  );
  console.log('generalToGeneral', generalToGeneral);

  const battleFactor = offenceToDefence * generalToGeneral;
  console.log('battleFactor', battleFactor);

  const pureOffence = userOffence + userGenerals * 10 + attackPower * 100;
  console.log('pureOffence', pureOffence);

  const initialDamage = Math.pow(battleFactor, 3.5) * pureOffence * 0.2;
  console.log('initialDamage', initialDamage);

  const damage = Math.round(initialDamage * 20); // Temporary scale up
  //TODO: Normally this damage is scaled by 0.1 to make more rounds

  return {
    value: damage,
    element: skill.element,
    attackEffect: null,
  };
};

export interface DamageResult {
  value: number;
  element: Maybe<SkillElement>;
  attackEffect: Maybe<AttackEffect>;
}

export interface AttackEffect {
  effect: Maybe<AttackEffect>;
}

export interface AttackSkill {
  attackCoefficients: Record<JutsuType, number>; // Needs to sum to 1;
  attackGenerals: Record<GeneralStats, number>; // Needs to sum to 1;
  element: Maybe<SkillElement>;
  skillLevel: number;
  skillBasePower: number;
}

export const ownedSkillToAttackSkill = (ownedSkill: OwnedSkill | ArenaCharacterSkill): AttackSkill => {
  return {
    element: ownedSkill.skillSkeleton.element,
    attackCoefficients: {
      GENJUTSU: (ownedSkill.skillSkeleton.genjutsuPercentRatio / 100),
      NINJUTSU: (ownedSkill.skillSkeleton.ninjutsuPercentRatio / 100),
      TAIJUTSU: (ownedSkill.skillSkeleton.taijutsuPercentRatio / 100),
      BUKIJUTSU: (ownedSkill.skillSkeleton.bukijutsuPercentRatio / 100),
    },
    attackGenerals: {
      SPEED: (ownedSkill.skillSkeleton.speedPercentRatio / 100),
      STRENGTH: (ownedSkill.skillSkeleton.strengthPercentRatio / 100),
      INTELLIGENCE: (ownedSkill.skillSkeleton.intelligencePercentRatio / 100),
      ENDURANCE: (ownedSkill.skillSkeleton.intelligencePercentRatio / 100),
    },
    skillBasePower: ownedSkill.skillSkeleton.basePower,
    skillLevel: 'level' in ownedSkill ? ownedSkill.level : 1,
  };
};