import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { HealthRegenModule } from "./health-regen/health-regen.module";
import * as session from "express-session";
import * as passport from "passport";

@Module({
  imports: [PrismaModule, AuthModule, HealthRegenModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: null,
          saveUninitialized: false,
          secret: "secret",
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 60000
          }
        }),
        passport.initialize(),
        passport.session()
      )
      .forRoutes("*");
  }
}
