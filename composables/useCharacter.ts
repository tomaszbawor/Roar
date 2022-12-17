import { Maybe } from "~/types/util";
import { ICharacter } from "~/types/ICharacter";
import { useUser } from "~/composables/useAuth";
import { useState } from "#app";

export const useCharacter = async (): Promise<Maybe<ICharacter>> => {
  const user = await useUser();

  try {
    const character = await $fetch<Maybe<ICharacter>>("/api/character", {
      method: "POST",
      body: {
        userId: user.id,
      },
    });

    return character;
  } catch (e) {
    console.log(e);
  }
};
