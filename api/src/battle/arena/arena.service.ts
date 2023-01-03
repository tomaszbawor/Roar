import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  ArenaCharacter,
  ArenaCharacterId,
} from '@common/battle/ArenaCharacter';

@Injectable()
export class ArenaService {
  constructor(private readonly prisma: PrismaService) {}

  async getArenaCharacterById(
    arenaCharId: ArenaCharacterId,
  ): Promise<ArenaCharacter> {
    const arenaCharacter = await this.prisma.arenaCharacter.findUnique({
      where: {
        id: arenaCharId,
      },
    });

    if (!arenaCharacter) {
      throw new NotFoundException(
        `Arena character with id: ${arenaCharId} not found`,
      );
    }

    return arenaCharacter;
  }

  async getArenaMonsters(): Promise<Array<ArenaCharacter>> {
    return this.prisma.arenaCharacter.findMany();
  }
}
