import { CharacterId, ICharacter } from "~/types/ICharacter";
import {
  ArenaCharacter,
  ArenaCharacterId,
} from "~/types/battle/ArenaCharacter";
import { Maybe } from "~/utils/Maybe";

export type BattleId = string;

export interface IBattle {
  id: BattleId;
  attackerId: CharacterId;
  defenderId: Maybe<CharacterId>;
  userDefender?: ICharacter;
  aiDefender: Maybe<ArenaCharacter>;
  defenderArenaCharacterId: Maybe<ArenaCharacterId>;
  state: BattleState;
  type: BattleType;
  attackerHealth: number;
  defenderHealth: number;

  attackerMaxHealth: number;
  defenderMaxHealth: number;
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
