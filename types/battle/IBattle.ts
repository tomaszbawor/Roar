import { CharacterId, ICharacter } from "~/types/ICharacter";
import { ArenaCharacter } from "~/types/battle/ArenaCharacter";

export type BattleId = string;

export interface IBattle {
  id: BattleId;
  attackerId: CharacterId;
  userDefender?: ICharacter;
  aiDefender?: ArenaCharacter;
  state: BattleState;
  type: BattleType;
}

export type BattleType = "AI" | "PVP";

export const BattleStateValues: {
  [x: string]:
    | "INITIALIZED"
    | "WAITING_FOR_BOTH"
    | "WAITING_FOR_ATTACKER"
    | "WAITING_FOR_DEFENDER"
    | "FINISHED"
    | "ACTIONS_DONE";
} = {
  /**
   * Mark two users as in battle
   */
  INITIALIZED: "INITIALIZED",
  /**
   *  No user commit action, fire timer for minute
   */
  WAITING_FOR_BOTH: "WAITING_FOR_BOTH",
  /**
   * Defender provided action first
   */
  WAITING_FOR_ATTACKER: "WAITING_FOR_ATTACKER",
  /**
   * Attacker provided action first
   */
  WAITING_FOR_DEFENDER: "WAITING_FOR_DEFENDER",
  /**
   * Actions provided, calculate damage and effects,
   * decrease effect timers by one,
   * if not finished move to waiting for both.
   * If health of one is zero finish
   */
  ACTIONS_DONE: "ACTIONS_DONE",
  /**
   * Battle finished, provide logs.
   */
  FINISHED: "FINISHED",
};

export type BattleState =
  typeof BattleStateValues[keyof typeof BattleStateValues];
