import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoggedInGuard } from '../security/logged-in.guard';
import {
  ArenaCharacter,
  ArenaCharacterId,
} from '@common/battle/ArenaCharacter';
import { BattleService } from './battle.service';
import { BattleId, IBattle } from '@common/battle/IBattle';
import { CharacterId } from '@common/Character';
import { ArenaService } from './arena/arena.service';

export class CreateArenaBattle {
  arenaCharacterId: ArenaCharacterId;
}

@Controller('battle')
export class BattleController {
  constructor(
    private readonly battleService: BattleService,
    private readonly arenaService: ArenaService,
  ) {}

  @Get(':id')
  @UseGuards(LoggedInGuard)
  getBattleById(@Param('id') battleId: BattleId): Promise<IBattle> {
    return this.battleService.getBattle(battleId);
  }

  @Post('arena')
  @UseGuards(LoggedInGuard)
  createArenaBattle(
    @Req() req,
    @Body() body: CreateArenaBattle,
  ): Promise<IBattle> {
    const characterId: CharacterId = req.user.characterId;
    return this.battleService.startArenaBattle(
      characterId,
      body.arenaCharacterId,
    );
  }

  @Get('arenaChars')
  @UseGuards(LoggedInGuard)
  getArenaCharacters(): Promise<Array<ArenaCharacter>> {
    return this.arenaService.getArenaMonsters();
  }

  @Get('arenaChars/:id')
  @UseGuards(LoggedInGuard)
  getArenaCharById(
    @Param('id') arenaCharId: ArenaCharacterId,
  ): Promise<Array<ArenaCharacter>> {
    return this.arenaService.getArenaMonsters();
  }
}
