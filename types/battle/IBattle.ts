import { ICharacter } from "~/types/ICharacter";
import { ArenaCharacter } from "~/types/battle/ArenaCharacter";

export type AIBattle = IBattle & { defender: ArenaCharacter };

export type BattleType = "AI" | "PVP";

export interface IBattle {
  attackerId: string;
  attacker: ICharacter;
  defenderId: string;
  defender: ICharacter | AIBattle;
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
