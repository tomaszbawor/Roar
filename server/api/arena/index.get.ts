import { ArenaCharacter } from "~/types/battle/ArenaCharacter";
import prisma from "~/server/database/client";

export default defineEventHandler<Array<ArenaCharacter>>(
  async (): Promise<Array<ArenaCharacter>> => {
    return await prisma.arenaCharacter.findMany();
  }
);
