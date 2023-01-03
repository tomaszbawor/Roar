import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LevelUpService } from './level-up.service';

@Module({
  imports: [PrismaModule],
  providers: [TrainingService, LevelUpService],
  controllers: [TrainingController],
})
export class TrainingModule {}
