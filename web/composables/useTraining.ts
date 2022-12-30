import { TrainCommand } from "../../common/form/TrainCommand";
import { ICharacter } from "../../common/ICharacter";


export async function useTraining(command: TrainCommand) {
  return $fetch<ICharacter>("/api/training", {
    method: "POST",
    body: command
  });
}
