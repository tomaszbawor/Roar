import { TrainCommand } from "~/types/form/TrainCommand";
import { getCookie } from "h3";
import { getUserBySessionToken } from "~/server/services/sessionService";
import { getCharacterByUserId } from "~/server/repositories/characterRepository";
import { trainSkills } from "~/server/services/trainingService";
import {
  TrainingCost,
  trainingCostPerUnit,
} from "~/engine/training/trainingTypes";
import ICharacterPool from "~/types/ICharacterPool";
import { ICharacter } from "~/types/ICharacter";
import { Maybe } from "~/utils/Maybe";
import {
  sendApiErrorOnFalseCondition,
  sendApiErrorOnNull,
} from "~/server/api/apiErrorsUtil";

export default defineEventHandler<ICharacter | null>(
  async (event): Promise<ICharacter | null> => {
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
  pool: Maybe<ICharacterPool>,
  trainCommand: TrainCommand
): boolean {
  if (!pool) {
    return false;
  }
  const unitTrainingCost = trainingCostPerUnit[trainCommand.trainType];
  const totalCost: TrainingCost = {
    chakra: unitTrainingCost.chakra * trainCommand.value,
    stamina: unitTrainingCost.stamina * trainCommand.value,
  };

  return pool.stamina >= totalCost.stamina && pool.chakra >= totalCost.chakra;
}
