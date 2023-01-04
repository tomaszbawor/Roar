import { TrainCommand } from "../../common/form/TrainCommand";
import { Character } from "../../common/Character";

export async function useTraining(command: TrainCommand) {
  return $fetch<Character>("/api/training", {
    method: "POST",
    body: command,
  });
}
