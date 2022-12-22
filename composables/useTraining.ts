import { TrainCommand } from "~/types/form/TrainCommand";
import { ICharacter } from "~/types/ICharacter";

export async function useTraining(command: TrainCommand) {
  return $fetch<ICharacter>("/api/training", {
    method: "POST",
    body: command,
  });
}
