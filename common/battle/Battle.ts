import { Maybe } from '../utils/Maybe';
import { Character, CharacterId } from '../Character';
import { ArenaCharacter, ArenaCharacterId } from './ArenaCharacter';

export type BattleId = string;

export interface Battle {
  id: BattleId;
  attackerId: CharacterId;
  defenderId: Maybe<CharacterId>;
  userDefender?: Character;
  aiDefender?: Maybe<ArenaCharacter>;
  defenderArenaCharacterId: Maybe<ArenaCharacterId>;
  state: BattleState;
  type: BattleType;
  attackerHealth: number;
  defenderHealth: number;

  attackerMaxHealth: number;
  defenderMaxHealth: number;
  turn: number;

  battleLog: Array<IBattleLog>;
}


export interface ArenaBattle extends Battle {
  aiDefender: ArenaCharacter;
  defenderArenaCharacterId: ArenaCharacterId;

}

export type BattleType = 'AI' | 'PVP';

export interface IBattleLog {
  battleId: BattleId;
  turn: number;
  attackerLog: string;
  defenderLog: string;
  attackerSkillId: Maybe<string>;
  defenderSkillId: Maybe<string>;
  attackerDamage: Maybe<number>;
  defenderDamage: Maybe<number>;
}

export const BattleStateValues: {
  [x: string]:
    | 'INITIALIZED'
    | 'WAITING_FOR_BOTH'
    | 'WAITING_FOR_ATTACKER'
    | 'WAITING_FOR_DEFENDER'
    | 'FINISHED'
    | 'ACTIONS_DONE';
} = {
  /**
   * Mark two users as in battle
   */
  INITIALIZED: 'INITIALIZED',
  /**
   *  No user commit action, fire timer for minute
   */
  WAITING_FOR_BOTH: 'WAITING_FOR_BOTH',
  /**
   * Defender provided action first
   */
  WAITING_FOR_ATTACKER: 'WAITING_FOR_ATTACKER',
  /**
   * Attacker provided action first
   */
  WAITING_FOR_DEFENDER: 'WAITING_FOR_DEFENDER',
  /**
   * Actions provided, calculate damage and effects,
   * decrease effect timers by one,
   * if not finished move to waiting for both.
   * If health of one is zero finish
   */
  ACTIONS_DONE: 'ACTIONS_DONE',
  /**
   * Battle finished, provide logs.
   */
  FINISHED: 'FINISHED',
};

export type BattleState =
  typeof BattleStateValues[keyof typeof BattleStateValues];
