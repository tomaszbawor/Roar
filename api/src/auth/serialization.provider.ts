import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { CharacterId } from '@common/Character';
import { UserId } from '@common/User';

export interface UserSessionData {
  id: UserId;
  email: string;
  role: string;

  characterId: CharacterId;
}

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }

  serializeUser(
    user: UserSessionData,
    done: (err: Error, user: UserSessionData) => void,
  ) {
    done(null, user);
  }

  async deserializeUser(
    payload: UserSessionData,
    done: (err: Error, user: Omit<UserSessionData, 'password'>) => void,
  ) {
    const user = await this.userService.findByEmail(payload.email);
    const characterId: CharacterId =
      await this.userService.findCharacterIdForUser(user.id);
    done(null, { ...user, characterId });
  }
}
