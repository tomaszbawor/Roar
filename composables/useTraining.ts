import { TrainCommand } from "~/types/form/TrainCommand";

export async function train(command: TrainCommand) {
  await $fetch<any>("/api/training", {
    method: "POST",
    body: command,
  });
}
