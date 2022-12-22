import { TrainCommand } from "~/types/form/TrainCommand";
import { getCookie, sendError } from "h3";
import { getUserBySessionToken } from "~/server/services/sessionService";
import { getCharacterByUserId } from "~/server/repositories/characterRepository";
import { trainSkills } from "~/server/services/trainingService";
import {
  TrainingCost,
  trainingCostPerUnit,
} from "~/engine/training/trainingTypes";
import ICharacterPool from "~/types/ICharacterPool";

export default defineEventHandler<any>(async (event) => {
  const body = await readBody<TrainCommand>(event);
  const authToken = getCookie(event, "auth_token");
  if (!authToken) {
    return null;
  }
  const user = await getUserBySessionToken(authToken);

  if (!user) {
    sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "User for session not found",
      })
    );
    return;
  }

  const character = await getCharacterByUserId(user.id);

  if (!character) {
    sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Character not found" })
    );
    return;
  }

  if (!validateTrainRequest(character.characterPool!, body)) {
    sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid train request" })
    );
  }

  await trainSkills(body, character);
});

function validateTrainRequest(
  pool: ICharacterPool,
  trainCommand: TrainCommand
): boolean {
  const unitTrainingCost = trainingCostPerUnit[trainCommand.trainType];
  const totalCost: TrainingCost = {
    chakra: unitTrainingCost.chakra * trainCommand.value,
    stamina: unitTrainingCost.stamina * trainCommand.value,
  };

  return pool.stamina >= totalCost.stamina && pool.chakra >= totalCost.chakra;
}
