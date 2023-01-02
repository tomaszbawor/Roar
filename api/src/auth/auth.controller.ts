import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@common/User';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { LocalGuard } from '../local.guard';
import { LoggedInGuard } from '../logged-in.guard';
import { UsersService } from '../users/users.service';

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
  loginUser(@Req() req, @Body() loginUserDto: LoginUserDto): string {
    return req.session;
  }

  @UseGuards(LoggedInGuard)
  @Get('getByAuthToken')
  async getByAuthToken(@Req() req): Promise<User> {
    const userEmail = req.session.passport.user.email;
    return await this.userService.findByEmail(userEmail);
  }
}
