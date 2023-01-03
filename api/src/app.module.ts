import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HealthRegenModule } from './health-regen/health-regen.module';
import { CharactersModule } from './characters/characters.module';
import { TrainingModule } from './training/training.module';
import * as session from 'express-session';
import * as passport from 'passport';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    HealthRegenModule,
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
          store: null,
          saveUninitialized: false,
          secret: 'secret',
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 60000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
