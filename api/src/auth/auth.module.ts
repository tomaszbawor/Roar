import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
