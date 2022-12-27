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

export const compositeElementFromBasicElements = (
  first: BasicElement,
  second: BasicElement
): CompositeElement => {
  const result = elementPairs[first][second];
  if (result === null) {
    throw new Error(`No composite element for ${first} and ${second}`);
  }
  return result;
};

export const getWeakness = (element: BasicElement): BasicElement => {
  const weaknessMap: Record<BasicElement, BasicElement> = {
    [BasicElement.FIRE]: BasicElement.WATER,
    [BasicElement.WATER]: BasicElement.WIND,
    [BasicElement.WIND]: BasicElement.EARTH,
    [BasicElement.EARTH]: BasicElement.LIGHTNING,
    [BasicElement.LIGHTNING]: BasicElement.FIRE,
  };
  return weaknessMap[element];
};

const elementPairs: Record<
  BasicElement,
  Record<BasicElement, CompositeElement | null>
> = {
  EARTH: {
    EARTH: null,
    FIRE: CompositeElement.LAVA,
    LIGHTNING: CompositeElement.MAGNETISM,
    WATER: CompositeElement.WOOD,
    WIND: CompositeElement.DUST,
  },
  FIRE: {
    EARTH: CompositeElement.LAVA,
    FIRE: null,
    LIGHTNING: CompositeElement.LIGHT,
    WATER: CompositeElement.STEAM,
    WIND: CompositeElement.SCORCHING,
  },
  LIGHTNING: {
    EARTH: CompositeElement.MAGNETISM,
    FIRE: CompositeElement.LIGHT,
    LIGHTNING: null,
    WATER: CompositeElement.STORM,
    WIND: CompositeElement.TEMPEST,
  },
  WATER: {
    EARTH: CompositeElement.WOOD,
    FIRE: CompositeElement.STEAM,
    LIGHTNING: CompositeElement.STORM,
    WATER: null,
    WIND: CompositeElement.ICE,
  },
  WIND: {
    EARTH: CompositeElement.DUST,
    FIRE: CompositeElement.SCORCHING,
    LIGHTNING: CompositeElement.TEMPEST,
    WATER: CompositeElement.ICE,
    WIND: null,
  },
};
