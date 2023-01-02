import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggedInGuard } from './logged-in.guard';
import { AdminGuard } from './admin.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPublic(): string {
    return 'Message known to all';
  }

  @UseGuards(LoggedInGuard)
  @Get('/logged')
  getLogged(): string {
    return 'Message known to logged users';
  }

  @UseGuards(AdminGuard)
  @Get('/admin')
  getAdmin(): string {
    return 'Message known to admins';
  }
}
