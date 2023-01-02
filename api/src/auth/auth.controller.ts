import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@common/User';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { LocalGuard } from '../local.guard';

export class LoginUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class RegisterUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  confirmPassword: string;
}

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(
    @Req() request,
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<User> {
    return this.authService.registerUser(registerUserDto);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  loginUser(@Req() req, @Body() loginUserDto: LoginUserDto): string {
    return req.session;
  }
}
