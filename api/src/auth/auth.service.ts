import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(userEmail: string, plainPassword: string): Promise<any> {
    const user = await this.usersService.findByEmail(userEmail);
    const isMatch = await this.comparePasswords(user.password, plainPassword);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async comparePasswords(
    passHash: string,
    plainPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, passHash);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
