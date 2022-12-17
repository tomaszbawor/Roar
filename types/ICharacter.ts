export interface ICharacter {
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
}

export type Village = "SAND" | "LEAF" | "STONE" | "CLOUD" | "MIST";

export type CharacterRank = "STUDENT" | "GENIN" | "CHUNIN" | "JONIN";
