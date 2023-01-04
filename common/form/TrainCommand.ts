import { TrainingType } from "../engine/training/trainingTypes";

export interface TrainCommand {
  trainType: TrainingType;
  value: number;
}
