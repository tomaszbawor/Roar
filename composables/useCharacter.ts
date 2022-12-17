import { CreateCharacterCommand, ICharacter } from "~/types/ICharacter";
import { useUser } from "~/composables/useAuth";
import { Maybe } from "~/utils/Maybe";

export const useCharacter = async (): Promise<Maybe<ICharacter>> => {
  const user = await useUser();

  try {
    const character = await $fetch<Maybe<ICharacter>>("/api/character", {
      method: "GET",
      query: {
        userId: user.id,
      },
    });

    return character;
  } catch (e) {
    console.log(e);
  }
};

export const createCharacter = async (
  command: Omit<CreateCharacterCommand, "userId">
): Promise<ICharacter> => {
  const character = await $fetch<ICharacter>("/api/character", {
    method: "POST",
    body: command,
  });

  return character;
};
