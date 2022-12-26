import { ICharacter } from "~/types/ICharacter";

export type ArenaCharacter = Omit<
  ICharacter,
  "id" | "userId" | "characterPool" | "village" | "rank"
> & { health: number };
