import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Maybe } from '@common/utils/Maybe';
import { User, UserId } from '@common/User';
import { CharacterId } from '@common/Character';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Maybe<User>> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return { password: '<hidden>', ...user };
  }

  async findCharacterIdForUser(userId: UserId): Promise<CharacterId> {
    const { id } = await this.prisma.character.findUnique({
      where: {
        userId: userId,
      },
      select: {
        id: true,
      },
    });

    return id;
  }

  create(email: string, passwordHash: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        password: passwordHash,
      },
    });
  }
}
