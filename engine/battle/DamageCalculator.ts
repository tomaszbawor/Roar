import { ICharacter } from "~/types/ICharacter";
import { AICharacter } from "~/types/battle/AiCharacter";
import { Maybe } from "~/utils/Maybe";
import { GeneralStats, JutsuType } from "~/engine/training/trainingTypes";
import { Element } from "~/engine/battle/Element";

function calculateOffence(
  attacker: ICharacter | AICharacter,
  skill: AttackSkill
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
  defender: ICharacter | AICharacter,
  skill: AttackSkill
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
  attacker: ICharacter | AICharacter,
  skill: AttackSkill
): number {
  const speed = attacker.speed * skill.attackGenerals.SPEED;
  const intelligence =
    attacker.intelligence * skill.attackGenerals.INTELLIGENCE;
  const strength = attacker.strength * skill.attackGenerals.STRENGTH;
  const endurance = attacker.endurance * skill.attackGenerals.ENDURANCE;

  return speed + intelligence + strength + endurance;
}

export const calculate = (
  attacker: ICharacter | AICharacter,
  defender: ICharacter | AICharacter,
  skill: AttackSkill
): Damage => {
  const attackPower = Math.sqrt(skill.skillLevel * skill.skillBasePower);

  const userOffence = calculateOffence(attacker, skill);
  console.log("userOffence", userOffence);

  const userGenerals = calculateGeneralStats(attacker, skill);
  console.log("userGenerals", userGenerals);

  const targetDefence = calculateDefence(defender, skill);
  console.log("targetDefence", targetDefence);

  const targetGenerals = calculateGeneralStats(defender, skill);
  console.log("targetGenerals", targetGenerals);

  // Target scale to ensure that for weak opponents defence matters more
  const targetDefenceAfterScale = 350 * Math.pow(targetDefence, 0.48);
  console.log("targetDefenceAfterScale", targetDefenceAfterScale);

  const targetGeneralsAfterScale = 350 * Math.pow(targetGenerals, 0.48);
  console.log("targetGeneralsAfterScale", targetGeneralsAfterScale);

  // Calculate ratios
  const offenceToDefence = Math.pow(userOffence / targetDefenceAfterScale, 0.1);
  console.log("offenceToDefence", offenceToDefence);
  const generalToGeneral = Math.pow(
    userGenerals / targetGeneralsAfterScale,
    0.1
  );
  console.log("generalToGeneral", generalToGeneral);

  const battleFactor = offenceToDefence * generalToGeneral;
  console.log("battleFactor", battleFactor);

  const pureOffence = userOffence + userGenerals * 10 + attackPower * 100;
  console.log("pureOffence", pureOffence);

  const initialDamage = Math.pow(battleFactor, 3.5) * pureOffence * 0.2;
  console.log("initialDamage", initialDamage);

  const damage = Math.round(initialDamage);
  //TODO: Normally this damage is scaled by 0.1 to make more rounds

  return {
    damage: damage,
    element: skill.element,
    attackEffect: null,
  };
};

export interface Damage {
  damage: number;
  element: Maybe<Element>;
  attackEffect: Maybe<AttackEffect>;
}

export interface AttackEffect {
  effect: Maybe<AttackEffect>;
}

export interface AttackSkill {
  attackCoefficients: Record<JutsuType, number>; // Needs to sum to 1;
  attackGenerals: Record<GeneralStats, number>; // Needs to sum to 1;
  element: Maybe<Element>;
  skillLevel: number;
  skillBasePower: number;
}
