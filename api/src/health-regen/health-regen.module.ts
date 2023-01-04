import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RegenCronService } from './regen-cron.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, ScheduleModule.forRoot()],
  providers: [RegenCronService],
})
export class HealthRegenModule {}
