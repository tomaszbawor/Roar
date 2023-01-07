import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CharacterId } from '@common/Character';
import { OwnedSkill } from '@common/Skills';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  getOwnedSkillsForUser(characterId: CharacterId): Promise<Array<OwnedSkill>> {
    return this.prisma.ownedSkill.findMany({
      where: {
        characterId: characterId,
      },
      include: {
        skillSkeleton: true,
      },
    });
  }
}
