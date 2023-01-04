export const VillageValues: {
  [x: string]: "SAND" | "LEAF" | "STONE" | "CLOUD" | "MIST";
} = {
  SAND: "SAND",
  LEAF: "LEAF",
  STONE: "STONE",
  CLOUD: "CLOUD",
  MIST: "MIST",
};

export type Village = typeof VillageValues[keyof typeof VillageValues];
