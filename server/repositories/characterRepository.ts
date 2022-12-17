import { CreateCharacterCommand, ICharacter } from "~/types/ICharacter";
import prisma from "~/server/database/client";
import { Maybe } from "~/utils/Maybe";

export async function getCharacterByUserId(
  userId: string
): Promise<Maybe<ICharacter>> {
  return await prisma.character.findUnique({
    where: {
      userId: userId,
    },
  });
}

export async function createCharacter(
  createCharacterCommand: CreateCharacterCommand
): Promise<ICharacter> {
  const character = await prisma.character.create({
    data: {
      name: createCharacterCommand.name,
      userId: createCharacterCommand.userId,
      village: createCharacterCommand.village,
    },
  });
  return character;
}
