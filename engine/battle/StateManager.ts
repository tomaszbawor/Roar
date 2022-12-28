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
