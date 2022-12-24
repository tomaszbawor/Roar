import { ICharacter } from "~/types/ICharacter";
import { AICharacter } from "~/types/battle/AiCharacter";

export type AIBattle = IBattle & { defender: AICharacter };

export type BattleType = "AI" | "PVP";

export interface IBattle {
  attackerId: string;
  attacker: ICharacter;
  defenderId: string;
  defender: ICharacter;
  battleType: BattleType;
}

export interface IBattleEntity {
  id: string;
}

// export function createBattle(
//   attacker: ICharacter,
//   defender: ICharacter | AICharacter
// ): IBattle {
//   return {
//     attackerId: attacker.id,
//   };
// }
