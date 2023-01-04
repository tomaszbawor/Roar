import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Character, CharacterId } from '@common/Character';
import { CharactersService } from './characters.service';
import { OwnedSkill } from '@common/Skills';
import { LoggedInGuard } from '../security/logged-in.guard';

@Controller('characters')
export class CharactersController {
  private readonly logger = new Logger(CharactersController.name);

  constructor(private readonly charactersService: CharactersService) {}

  @Get('/me')
  @UseGuards(LoggedInGuard)
  async getCurrentCharacter(@Req() req): Promise<Character> {
    const userId: string = req.user.id;
    const maybeChar = this.charactersService.getByUserId(userId);
    if (!maybeChar) {
      throw new NotFoundException('No character found for user');
    }
    return maybeChar;
  }

  @Get('/me/skills')
  @UseGuards(LoggedInGuard)
  async getMineSkills(@Req() req): Promise<Array<OwnedSkill>> {
    const characterId: CharacterId = req.user.characterId;
    return await this.charactersService.getSkillsForCharacterId(characterId);
  }
}
