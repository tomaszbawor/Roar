import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "@common/User";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: { email: string; role: string }) => void) {
    done(null, { email: user.email, role: user.role });
  }

  async deserializeUser(payload: { email: string; role: string }, done: (err: Error, user: Omit<User, "password">) => void) {
    const user = await this.userService.findByEmail(payload.email);
    done(null, user);
  }
}
