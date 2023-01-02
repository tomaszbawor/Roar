import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Maybe } from '@common/utils/Maybe';
import { User } from '@common/User';

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

  create(email: string, passwordHash: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        password: passwordHash,
      },
    });
  }
}
