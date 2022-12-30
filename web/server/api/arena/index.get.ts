import prisma from "~/server/database/client";
import { ArenaCharacter } from "../../../../common/battle/ArenaCharacter";

export default defineEventHandler<Array<ArenaCharacter>>(
  async (event): Promise<Array<ArenaCharacter>> => {
    const queryParams = getQuery(event);
    const monsterId = queryParams.monsterId as string;
    if (monsterId) {
      return await prisma.arenaCharacter.findMany({
        where: {
          id: monsterId
        }
      });
    } else {
      return await prisma.arenaCharacter.findMany();
    }
  }
);
