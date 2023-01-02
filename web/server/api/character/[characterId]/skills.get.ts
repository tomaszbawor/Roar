import prisma from "~/server/database/client";
import { OwnedSkill } from "../../../../../common/Skills";

export default defineEventHandler<Array<OwnedSkill>>(async (event) => {
  const characterId = event.context.params.characterId;

  const skills: Array<OwnedSkill> = await prisma.ownedSkill.findMany({
    where: {
      characterId: characterId,
    },
    include: {
      skillSkeleton: true,
    },
  });

  return skills;
});
