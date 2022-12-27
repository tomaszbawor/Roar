import { ICharacter } from "~/types/ICharacter";

export type ArenaCharacter = Omit<
  ICharacter,
  "userId" | "characterPool" | "village" | "rank" | "isInBattle"
> & { health: number };
