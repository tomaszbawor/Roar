import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Character } from '@common/Character';
import { Maybe } from '@common/utils/Maybe';

@Injectable()
export class CharactersService {
  constructor(private readonly prisma: PrismaService) {}

  async getByUserId(userId: string): Promise<Maybe<Character>> {
    return this.prisma.character.findUnique({
      where: {
        userId: userId,
      },
      include: {
        characterPool: true,
      },
    });
  }
}
