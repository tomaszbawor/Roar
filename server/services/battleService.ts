import { ArenaCharacter } from "~/types/battle/ArenaCharacter";
import { Maybe } from "~/utils/Maybe";
import { getArenaCharacterById } from "~/server/repositories/arenaCharacterRepository";
import { ICharacter } from "~/types/ICharacter";

export const startArenaBattle = async (
  startBattleCommand: StartBattleCommand
): Promise<void> => {
  // Get Ai Character
  const aiCharacter: Maybe<ArenaCharacter> = await getArenaCharacterById(
    startBattleCommand.arenaCharacterId
  );

  if (!aiCharacter) {
    throw new Error(
      `Arena character with id: ${startBattleCommand.arenaCharacterId} not found`
    );
  }

  // Get User Character

  // Check if user is not in the battle
};

export interface StartBattleCommand {
  arenaCharacterId: string;
  character: ICharacter;
}
