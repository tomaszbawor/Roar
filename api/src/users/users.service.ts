import { Injectable } from "@nestjs/common";
import { User } from "@common/User";
import { PrismaService } from "../infrastructure/prisma/prisma.service";
import { Maybe } from "@common/utils/Maybe";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {
  }

  async findByEmail(email: string): Promise<Maybe<User>> {
    return this.prisma.user.findUnique({
      where: {
        email: email
      }
    });
  }
}
