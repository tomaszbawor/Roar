export const SkillTypeValues: {
  [x: string]: "GENJUTSU" | "NINJUTSU" | "TAIJUTSU" | "BUKIJUTSU";
} = {
  GENJUTSU: "GENJUTSU",
  NINJUTSU: "NINJUTSU",
  TAIJUTSU: "TAIJUTSU",
  BUKIJUTSU: "BUKIJUTSU",
};

export type SkillType = typeof SkillTypeValues[keyof typeof SkillTypeValues];
