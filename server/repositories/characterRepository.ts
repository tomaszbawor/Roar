import { ICharacter } from "~/types/ICharacter";
import prisma from "~/server/database/client";
import { Maybe } from "~/utils/Maybe";

export async function getCharacterByUserId(
  userId: string
): Promise<Maybe<ICharacter>> {
  return await prisma.character.findUnique({
    where: {
      userId: userId
    }
  });
}
