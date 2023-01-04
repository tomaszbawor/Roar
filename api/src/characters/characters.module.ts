import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SkillsService } from './skills/skills.service';

@Module({
  imports: [PrismaModule],
  controllers: [CharactersController],
  providers: [CharactersService, SkillsService],
  exports: [CharactersService],
})
export class CharactersModule {}
