import { OwnedSkill } from "./Skills";
import { Village } from "./enums/Village";
import { BattleId } from "./battle/IBattle";
import { Maybe } from "./utils/Maybe";
import ICharacterPool from "./ICharacterPool";


export type CharacterId = string;

export interface ICharacter {
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
  characterPool: Maybe<ICharacterPool>;
}

export type ICharacterWithSkills = ICharacter & {
  ownedSkills: OwnedSkill[];
};

export interface CreateCharacterCommand {
  userId: string;
  name: string;
  village: Village;
}

export type CharacterRank = "STUDENT" | "GENIN" | "CHUNIN" | "JONIN";