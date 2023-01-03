import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TrainingService } from './training.service';
import { LoggedInGuard } from '../logged-in.guard';
import { TrainingType } from '@common/engine/training/trainingTypes';
import { ApiProperty } from '@nestjs/swagger';

export class PostTrainingDto {
  @ApiProperty()
  trainType: TrainingType;
  @ApiProperty()
  value: number;
}

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  @UseGuards(LoggedInGuard)
  async train(@Req() req, @Body() body: PostTrainingDto) {
    await this.trainingService.train(req.user, body);
  }
}
