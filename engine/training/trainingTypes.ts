export enum SkillType {
  OFFENSIVE_GENJUTSU = "OFFENSIVE_GENJUTSU",
  OFFENSIVE_NINJUTSTU = "OFFENSIVE_NINJUTSU",
  OFFENSIVE_TAIJUTSU = "OFFENSIVE_TAIJUTSU",
  OFFENSIVE_BUKIJUTSU = "OFFENSIVE_BUKIJUTSU",

  DEFENSIVE_GENJUTSU = "DEFENSIVE_GENJUTSU",
  DEFENSIVE_NINJUTSTU = "DEFENSIVE_NINJUTSU",
  DEFENSIVE_TAIJUTSU = "DEFENSIVE_TAIJUTSU",
  DEFENSIVE_BUKIJUTSU = "DEFENSIVE_BUKIJUTSU",
}

export enum JutsuType {
  GENJUTSU = "GENJUTSU",
  NINJUTSU = "NINJUTSU",
  TAIJUTSU = "TAIJUTSU",
  BUKIJUTSU = "BUKIJUTSU",
}

export enum GeneralStats {
  STRENGTH = "STRENGTH",
  SPEED = "SPEED",
  ENDURANCE = "ENDURANCE",
  INTELLIGENCE = "INTELLIGENCE",
}

export interface TrainingCost {
  chakra: number;
  stamina: number;
}

export enum PoolExtendTraining {
  CHAKRA_EXTEND = "CHAKRA_EXTEND",
  STAMINA_EXTEND = "STAMINA_EXTEND",
}

export type TrainingType = SkillType | GeneralStats | PoolExtendTraining;

export const trainingCostPerUnit: Record<TrainingType, TrainingCost> = {
  OFFENSIVE_NINJUTSU: { chakra: 10, stamina: 0 },
  DEFENSIVE_NINJUTSU: { chakra: 10, stamina: 0 },
  OFFENSIVE_GENJUTSU: { chakra: 10, stamina: 0 },
  DEFENSIVE_GENJUTSU: { chakra: 10, stamina: 0 },
  OFFENSIVE_TAIJUTSU: { chakra: 0, stamina: 10 },
  DEFENSIVE_TAIJUTSU: { chakra: 0, stamina: 10 },
  OFFENSIVE_BUKIJUTSU: { chakra: 0, stamina: 10 },
  DEFENSIVE_BUKIJUTSU: { chakra: 0, stamina: 10 },
  ENDURANCE: { chakra: 25, stamina: 25 },
  INTELLIGENCE: { chakra: 50, stamina: 0 },
  SPEED: { chakra: 25, stamina: 25 },
  STRENGTH: { chakra: 0, stamina: 50 },
  CHAKRA_EXTEND: { chakra: 100, stamina: 0 },
  STAMINA_EXTEND: { chakra: 0, stamina: 100 },
};

export interface TrainingIncrements {
  maxChakra: number;
  maxStamina: number;
  maxHealth: number;
  strength: number;
  speed: number;
  endurance: number;
  intelligence: number;
  offensiveNinjutsu: number;
  offensiveTaijutsu: number;
  offensiveGenjutsu: number;
  offensiveBukijutsu: number;
  defensiveNinjutsu: number;
  defensiveTaijutsu: number;
  defensiveGenjutsu: number;
  defensiveBukijutsu: number;
}
