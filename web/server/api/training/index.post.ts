import { getCookie } from "h3";
import { getUserBySessionToken } from "~/server/services/sessionService";
import { getCharacterByUserId } from "~/server/repositories/characterRepository";
import { trainSkills } from "~/server/services/trainingService";

import { sendApiErrorOnFalseCondition, sendApiErrorOnNull } from "~/server/api/apiErrorsUtil";
import { Character } from "../../../../common/Character";
import { TrainCommand } from "../../../../common/form/TrainCommand";
import CharacterPool from "../../../../common/CharacterPool";
import { Maybe } from "../../../../common/utils/Maybe";
import { TrainingCost, trainingCostPerUnit } from "../../../../common/engine/training/trainingTypes";

export default defineEventHandler<Character | null>(
  async (event): Promise<Character | null> => {
    const trainCommand = await readBody<TrainCommand>(event);
    const authToken = getCookie(event, "auth_token");
    if (!authToken) {
      return null;
    }
    const user = await getUserBySessionToken(authToken);

    sendApiErrorOnNull(user, event, 400, "User for session not found");
    const character = await getCharacterByUserId(user.id);

    sendApiErrorOnNull(character, event, 400, "Character for user not found");

    sendApiErrorOnFalseCondition(
      isTrainRequestValid(character.characterPool, trainCommand),
      event,
      400,
      "Invalid train request"
    );

    return await trainSkills(trainCommand, character);
  }
);

function isTrainRequestValid(
  pool: Maybe<CharacterPool>,
  trainCommand: TrainCommand
): boolean {
  if (!pool) {
    return false;
  }
  const unitTrainingCost = trainingCostPerUnit[trainCommand.trainType];
  const totalCost: TrainingCost = {
    chakra: unitTrainingCost.chakra * trainCommand.value,
    stamina: unitTrainingCost.stamina * trainCommand.value
  };

  return pool.stamina >= totalCost.stamina && pool.chakra >= totalCost.chakra;
}
