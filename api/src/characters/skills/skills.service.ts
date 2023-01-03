import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserId } from '@common/User';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  getOwnedSkillsForUser(userId: UserId) {}
}
