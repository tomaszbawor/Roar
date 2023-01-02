import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';

@Module({
  providers: [TrainingService],
  controllers: [TrainingController],
})
export class TrainingModule {}
