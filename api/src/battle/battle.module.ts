import { Module } from '@nestjs/common';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import { ArenaService } from './arena/arena.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BattleController],
  providers: [BattleService, ArenaService],
})
export class BattleModule {}
