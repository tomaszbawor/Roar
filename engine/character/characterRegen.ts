import { ICharacter } from "~/types/ICharacter";

export const getRegenerationRateForCharacter = (
  character: ICharacter
): number => {
  switch (character.rank) {
    case "STUDENT":
      return 5;
    case "GENIN":
      return 20;
    case "CHUNIN":
      return 50;
    case "JONIN":
      return 100;
  }
};
