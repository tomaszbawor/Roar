import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
