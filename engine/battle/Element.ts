export enum BasicElement {
  FIRE = "FIRE",
  WATER = "WATER",
  WIND = "WIND",
  EARTH = "EARTH",
  LIGHTNING = "LIGHTNING",
}

export enum CompositeElement {
  ICE = "ICE",
  SCORCHING = "SCORCHING",
  LIGHT = "LIGHT",
  TEMPEST = "TEMPEST",
  DUST = "DUST",
  MAGNETISM = "MAGNETISM",
  STORM = "STORM",
  WOOD = "WOOD",
  LAVA = "LAVA",
  STEAM = "STEAM",
}

export type Element = BasicElement | CompositeElement;

export const compositeElementFromBasicElements = (first: BasicElement, second: BasicElement): CompositeElement => {
  return CompositeElement.LAVA;
};