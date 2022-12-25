import prisma from "~/server/database/client";
import { AICharacter } from "~/types/battle/AiCharacter";
import { Maybe } from "~/utils/Maybe";

export const startArenaBattle = async (
  startBattleCommand: StartBattleCommand
): Promise<void> => {
  const aiCharacter: Maybe<AICharacter> = await prisma.aICharacter.findUnique({
    where: {
      id: startBattleCommand.arenaOpponentId,
    },
  });
  // TODO: Create battle
};

export interface StartBattleCommand {
  arenaOpponentId: string;
}
