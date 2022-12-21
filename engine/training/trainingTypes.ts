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

export const trainingCostPerUnit: Record<SkillType | StatType, TrainingCost> = {
  NINJUTSU: { chakra: 10, stamina: 0 },
  GENJUTSU: { chakra: 10, stamina: 0 },
  TAIJUTSU: { chakra: 0, stamina: 10 },
  ENDURANCE: { chakra: 25, stamina: 25 },
  INTELLIGENCE: { chakra: 50, stamina: 0 },
  SPEED: { chakra: 25, stamina: 25 },
  STRENGTH: { chakra: 0, stamina: 50 },
};
