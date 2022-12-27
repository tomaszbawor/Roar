import { ArenaCharacter } from "~/types/battle/ArenaCharacter";
import { Maybe } from "~/utils/Maybe";
import { getArenaCharacterById } from "~/server/repositories/arenaCharacterRepository";
import { getCharacterById } from "~/server/repositories/characterRepository";
import { createArenaBattle } from "~/server/repositories/battleRepository";
import { CharacterId } from "~/types/ICharacter";

export const startArenaBattle = async (
  startBattleCommand: StartArenaBattleCommand
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
  const character = await getCharacterById(startBattleCommand.characterId);

  if (!character) {
    throw new Error(
      `Character with id: ${startBattleCommand.characterId} not found`
    );
  }

  // Check if user is not in the battle
  if (character.isInBattle) {
    throw new Error("Character is already in the battle");
  }

  // Create Battle
  const battle = await createArenaBattle(aiCharacter, character);
};

export interface StartArenaBattleCommand {
  arenaCharacterId: string;
  characterId: CharacterId;
}
