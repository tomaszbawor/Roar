import { ICharacter } from "~/types/ICharacter";

export type AICharacter = Omit<
  ICharacter,
  "id" | "userId" | "characterPool" | "village" | "rank"
> & { health: number };
