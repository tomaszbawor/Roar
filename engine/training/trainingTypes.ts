export enum SkillType {
  GENJUTSU = "GENJUTSU",
  NINJUTSTU = "NINJUTSU",
  TAIJUTSU = "TAIJUTSU",
}

export enum StatType {
  STRENGTH = "STRENGTH",
  "SPEED" = "SPEED",
  "ENDURANCE" = "ENDURANCE",
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

export type TrainingType = SkillType | StatType | PoolExtendTraining;

export const trainingCostPerUnit: Record<TrainingType, TrainingCost> = {
  NINJUTSU: { chakra: 10, stamina: 0 },
  GENJUTSU: { chakra: 10, stamina: 0 },
  TAIJUTSU: { chakra: 0, stamina: 10 },
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
  ninjutsu: number;
  genjutsu: number;
  taijustu: number;
}
