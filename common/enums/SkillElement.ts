export const SkillElementValues: {
  [x: string]:
    | "FIRE"
    | "WATER"
    | "WIND"
    | "EARTH"
    | "LIGHTNING"
    | "ICE"
    | "SCORCHING"
    | "LIGHT"
    | "TEMPEST"
    | "DUST"
    | "MAGNETISM"
    | "STORM"
    | "WOOD"
    | "LAVA"
    | "STEAM";
} = {
  FIRE: "FIRE",
  WATER: "WATER",
  WIND: "WIND",
  EARTH: "EARTH",
  LIGHTNING: "LIGHTNING",
  ICE: "ICE",
  SCORCHING: "SCORCHING",
  LIGHT: "LIGHT",
  TEMPEST: "TEMPEST",
  DUST: "DUST",
  MAGNETISM: "MAGNETISM",
  STORM: "STORM",
  WOOD: "WOOD",
  LAVA: "LAVA",
  STEAM: "STEAM",
};

export type SkillElement =
  typeof SkillElementValues[keyof typeof SkillElementValues];
