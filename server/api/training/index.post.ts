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
import { ICharacter } from "~/types/ICharacter";
import { Maybe } from "~/utils/Maybe";

export default defineEventHandler<ICharacter | null>(
  async (event): Promise<ICharacter | null> => {
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
      return null;
    }

    const character = await getCharacterByUserId(user.id);

    if (!character) {
      sendError(
        event,
        createError({ statusCode: 400, statusMessage: "Character not found" })
      );
      return null;
    }

    if (!validateTrainRequest(character.characterPool, body)) {
      sendError(
        event,
        createError({ statusCode: 400, statusMessage: "Invalid train request" })
      );
    }

    return await trainSkills(body, character);
  }
);

function validateTrainRequest(
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
