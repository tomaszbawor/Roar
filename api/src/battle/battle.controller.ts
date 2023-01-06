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
import { Battle, BattleId } from '@common/battle/Battle';
import { CharacterId } from '@common/Character';
import { ArenaService } from './arena/arena.service';
import { Maybe } from '@common/utils/Maybe';
import { ApiProperty } from '@nestjs/swagger';
import { SkillSkeletonId } from '@common/Skills';

export class CreateArenaBattle {
  @ApiProperty()
  arenaCharacterId: ArenaCharacterId;
}

export class PostArenaAction {
  @ApiProperty()
  skillId: SkillSkeletonId;

  @ApiProperty()
  battleId: BattleId;
}

@Controller('battle')
export class BattleController {
  constructor(
    private readonly battleService: BattleService,
    private readonly arenaService: ArenaService,
  ) {}

  @Get('/arenaChars')
  @UseGuards(LoggedInGuard)
  getAvalibleArenaOpponents(): Promise<Array<ArenaCharacter>> {
    return this.arenaService.getArenaMonsters();
  }

  @Get(':id')
  @UseGuards(LoggedInGuard)
  getBattleById(@Param('id') battleId: BattleId): Promise<Battle> {
    return this.battleService.getArenaBattle(battleId);
  }

  @Post('arena/start')
  @UseGuards(LoggedInGuard)
  createArenaBattle(
    @Req() req,
    @Body() body: CreateArenaBattle,
  ): Promise<Battle> {
    const characterId: CharacterId = req.user.characterId;
    return this.battleService.startArenaBattle(
      characterId,
      body.arenaCharacterId,
    );
  }

  @Post('/arena/action')
  async postArenaAction(@Req() req, @Body() body: PostArenaAction) {
    const characterId = req.user.characterId;
    await this.arenaService.makeBattleAction(
      characterId,
      body.skillId,
      body.battleId,
    );
  }

  @Get('arenaChars/:id')
  @UseGuards(LoggedInGuard)
  getArenaCharById(
    @Param('id') arenaCharId: ArenaCharacterId,
  ): Promise<Maybe<ArenaCharacter>> {
    return this.arenaService.getArenaCharacterById(arenaCharId);
  }
}
