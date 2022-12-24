import { AICharacter } from "~/types/battle/AiCharacter";
import prisma from "~/server/database/client";

export default defineEventHandler<Array<AICharacter>>(
  async (): Promise<Array<AICharacter>> => {
    return await prisma.aICharacter.findMany();
  }
);
