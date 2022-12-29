import prisma from "~/server/database/client";

export default defineEventHandler<any>(async (event) => {
  const characterId = event.context.params.characterId;

  // TODO: Check if admin or character owner
  return await prisma.ownedSkill.findMany({
    where: {
      characterId: characterId,
    },
    include: {
      skillSkeleton: true,
    },
  });
});
