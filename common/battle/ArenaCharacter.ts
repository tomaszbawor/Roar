import { ArenaCharacterSkill } from "./ArenaCharacterSkill";

export interface ArenaCharacter {
  id: ArenaCharacterId;
  name: string;
  health: number;
  offensiveNinjutsu: number;
  offensiveTaijutsu: number;
  offensiveGenjutsu: number;
  offensiveBukijutsu: number;
  defensiveNinjutsu: number;
  defensiveTaijutsu: number;
  defensiveGenjutsu: number;
  defensiveBukijutsu: number;
  speed: number;
  intelligence: number;
  strength: number;
  endurance: number;
  currencyGain: number;
}

export type ArenaCharacterWithSkills = ArenaCharacter & {
  skills: Array<ArenaCharacterSkill>;
};

export type ArenaCharacterId = string;
