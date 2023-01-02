import { Character, CreateCharacterCommand } from "../../common/Character";
import { Maybe } from "../../common/utils/Maybe";

export const useCharacter = async (): Promise<Maybe<Character>> => {
  try {
    const character = await $fetch<Maybe<Character>>("/api/characters/mine", {
      method: "GET"
    });
    return character;
  } catch (e) {
    console.log(e);
  }
};

export const createCharacter = async (
  command: Omit<CreateCharacterCommand, "userId">
): Promise<Character> => {
  const character = await $fetch<Character>("/api/character", {
    method: "POST",
    body: command
  });

  return character;
};
