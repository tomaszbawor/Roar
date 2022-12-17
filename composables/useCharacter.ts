import { Maybe } from "~/types/util";
import { ICharacter } from "~/types/ICharacter";
import { useUser } from "#build/imports";

export const useCharacter = async (): Promise<Maybe<ICharacter>> => {
  const user = await useUser();
  return await $fetch<Maybe<ICharacter>>("/api/character", {
    method: "POST",
    body: {
      userId: user.id,
    },
  });
};
