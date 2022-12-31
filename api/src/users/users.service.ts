import { Injectable } from "@nestjs/common";
import { User } from "../../../common/User";
import { PrismaService } from "../infrastructure/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({
      where: {
        email: email
      }
    });
  }
}
