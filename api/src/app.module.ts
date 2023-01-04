import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HealthRegenModule } from './health-regen/health-regen.module';
import { CharactersModule } from './characters/characters.module';
import { TrainingModule } from './training/training.module';
import { BattleModule } from './battle/battle.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    HealthRegenModule,
    BattleModule,
    CharactersModule,
    TrainingModule,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new PrismaSessionStore(
            new PrismaClient(), {
              checkPeriod: 2 * 60 * 1000,  //ms
              dbRecordIdIsSessionId: true,
              dbRecordIdFunction: undefined,
            },
          ),
          saveUninitialized: false,
          secret: 'secret', // TODO: Make parametrized from configuration
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 2 * 60 * 60 * 1000, // 2 hours
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
