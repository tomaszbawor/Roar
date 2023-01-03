import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserId } from '@common/User';
import { PostTrainingDto } from './training.controller';

@Injectable()
export class TrainingService {
  constructor(private readonly prismaService: PrismaService) {}

  async train(userId: UserId, train: PostTrainingDto) {
    //TODO: Move logic here
  }
}
