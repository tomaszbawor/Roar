const BattleResultValues: {
  [x: string]: "TIE" | "ATTACKER_WIN" | "DEFENDER_WIN";
} = {
  TIE: "TIE",
  ATTACKER_WIN: "ATTACKER_WIN",
  DEFENDER_WIN: "DEFENDER_WIN",
};

export type BattleResult =
  typeof BattleResultValues[keyof typeof BattleResultValues];
