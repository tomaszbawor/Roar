import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Character } from '@common/Character';
import { CharactersService } from './characters.service';
import { LoggedInGuard } from '../logged-in.guard';

@Controller('characters')
export class CharactersController {
  private readonly logger = new Logger(CharactersController.name);

  constructor(private readonly charactersService: CharactersService) {}

  @Get('/mine')
  @UseGuards(LoggedInGuard)
  async getCurrentCharacter(@Req() req): Promise<Character> {
    const userId: string = req.session.passport.user.id;
    const maybeChar = this.charactersService.getByUserId(userId);
    if (!maybeChar) {
      throw new NotFoundException('No character found for user');
    }
    return maybeChar;
  }
}
