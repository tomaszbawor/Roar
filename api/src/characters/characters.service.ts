import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Character, CharacterId } from '@common/Character';
import { Maybe } from '@common/utils/Maybe';
import { OwnedSkill } from '@common/Skills';

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

  async getSkillsForCharacterId(
    characterId: CharacterId,
  ): Promise<Array<OwnedSkill>> {
    return await this.prisma.ownedSkill.findMany({
      where: {
        characterId: characterId,
      },
      include: {
        skillSkeleton: true,
      },
    });
  }

  async getCharacterById(characterId: CharacterId): Promise<Character> {
    const character = await this.prisma.character.findUnique({
      where: {
        id: characterId,
      },
      include: {
        characterPool: true,
      },
    });

    if (!character) {
      throw new NotFoundException(
        `Character with id: ${characterId} not found`,
      );
    }

    return character;
  }
}
