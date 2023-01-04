import { OwnedSkill } from "./Skills";
import { Village } from "./enums/Village";
import { BattleId } from "./battle/IBattle";
import { Maybe } from "./utils/Maybe";
import CharacterPool from "./CharacterPool";


export type CharacterId = string;

export interface Character {
  id: CharacterId;
  userId: string;
  name: string;
  village: Village;
  rank: CharacterRank;
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
  isInBattle: boolean;
  currentBattleId: Maybe<BattleId>;
  characterPool: Maybe<CharacterPool>;
}

export type ICharacterWithSkills = Character & {
  ownedSkills: OwnedSkill[];
};

export interface CreateCharacterCommand {
  userId: string;
  name: string;
  village: Village;
}

export type CharacterRank = "STUDENT" | "GENIN" | "CHUNIN" | "JONIN";