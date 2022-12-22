import { TrainCommand } from "~/types/form/TrainCommand";

export async function useTraining(command: TrainCommand) {
  await $fetch<any>("/api/training", {
    method: "POST",
    body: command,
  });
}
