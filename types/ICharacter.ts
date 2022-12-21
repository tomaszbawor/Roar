import ICharacterPool from "~/types/ICharacterPool";

export interface ICharacter {
  id: string;
  userId: string;
  name: string;
  village: Village;
  rank: CharacterRank;
  ninjutsu: number;
  taijutsu: number;
  genjutsu: number;
  speed: number;
  intelligence: number;
  strength: number;
  endurance: number;
  characterPool: ICharacterPool;
}

export interface CreateCharacterCommand {
  userId: string;
  name: string;
  village: Village;
}

export type Village = "SAND" | "LEAF" | "STONE" | "CLOUD" | "MIST";

export type CharacterRank = "STUDENT" | "GENIN" | "CHUNIN" | "JONIN";
