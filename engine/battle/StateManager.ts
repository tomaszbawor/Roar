import { ICharacter } from "~/types/ICharacter";

enum BattleState {
  /**
   * Mark two users as in battle
   */
  INITIALIZED,
  /**
   *  No user commit action, fire timer for minute
   */
  WAITING_FOR_BOTH,
  /**
   * Defender provided action first
   */
  WAITING_FOR_ATTACKER,
  /**
   * Attacker provided action first
   */
  WAITING_FOR_DEFENDER,
  /**
   * Actions provided, calculate damage and effects,
   * decrease effect timers by one,
   * if not finished move to waiting for both.
   * If health of one is zero finish
   */
  ACTIONS_DONE,
  /**
   * Battle finished, provide logs.
   */
  FINISHED,
}

export interface Battle {
  attacker: ICharacter;
  defender: ICharacter | AICharacter;
  state: BattleState;
}

export type AICharacter = Omit<
  ICharacter,
  "id" | "userId" | "characterPool" | "village" | "rank"
>;

export enum BattleParticipant {
  ATTACKER = "ATTACKER",
  DEFENDER = "DEFENDER",
}

export enum DebuffType {
  SLOW = "SLOW", // Decrease speed percentage
  WEAKEN = "WEAKEN", // Decrease strength percentage
  CONFUSE = "CONFUSE", // Decrease intelligence
  INFIRMITY = "INFIRMITY", // Decrease endurance
}

export interface AbstractDebuff {
  type: DebuffType;
}
