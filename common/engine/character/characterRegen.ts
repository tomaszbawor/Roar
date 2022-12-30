import { CharacterRank, ICharacter } from "../../ICharacter";

export const getRegenerationRateForCharacter = (
  character: ICharacter
): number => {
  return characterBaseRegenRates[character.rank];
};

export const characterBaseRegenRates: Record<CharacterRank, number> = {
  STUDENT: 5,
  GENIN: 20,
  CHUNIN: 50,
  JONIN: 100
};
