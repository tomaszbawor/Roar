import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@common/User';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { LocalGuard } from '../security/local.guard';
import { LoggedInGuard } from '../security/logged-in.guard';

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
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('register')
  registerUser(
    @Req() request,
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<User> {
    return this.authService.registerUser(registerUserDto);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginUser(@Req() req, @Body() login: LoginUserDto): User {
    return req.user;
  }

  @UseGuards(LoggedInGuard)
  @Get('getByAuthToken')
  async getByAuthToken(@Req() req): Promise<User> {
    const userEmail = req.session.passport.user.email;
    return await this.userService.findByEmail(userEmail);
  }
}
