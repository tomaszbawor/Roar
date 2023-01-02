import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { AuthSerializer } from './serialization.provider';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, AuthSerializer],
  exports: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
