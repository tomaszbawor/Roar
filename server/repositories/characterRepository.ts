import { ICharacter } from "~/types/ICharacter";
import { Maybe } from "~/types/util";
import prisma from "~/server/database/client";

export async function getCharacterByUserId(
  userId: string
): Promise<Maybe<ICharacter>> {
  return await prisma.character.findUnique({
    where: {
      userId: userId,
    },
  });
}
