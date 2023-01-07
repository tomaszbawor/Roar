import { Character, CharacterRank } from "../../Character";

export const getRegenerationRateForCharacter = (
  character: Character
): number => {
  return characterBaseRegenRates[character.rank] * 5; // Modificator
};

export const characterBaseRegenRates: Record<CharacterRank, number> = {
  STUDENT: 5,
  GENIN: 20,
  CHUNIN: 50,
  JONIN: 100,
};
