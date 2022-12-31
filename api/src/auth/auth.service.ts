import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {
  }

  async validateUser(userEmail: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(userEmail);
    if (user && user.password === pass) {
      //TODO: Bcrypt
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
