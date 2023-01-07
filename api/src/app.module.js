"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_service_1 = require("./app.service");
var prisma_module_1 = require("./prisma/prisma.module");
var auth_module_1 = require("./auth/auth.module");
var health_regen_module_1 = require("./health-regen/health-regen.module");
var characters_module_1 = require("./characters/characters.module");
var training_module_1 = require("./training/training.module");
var battle_module_1 = require("./battle/battle.module");
var session = require("express-session");
var passport = require("passport");
var prisma_session_store_1 = require("@quixo3/prisma-session-store");
var client_1 = require("@prisma/client");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer
            .apply(session({
            store: new prisma_session_store_1.PrismaSessionStore(new client_1.PrismaClient(), {
                checkPeriod: 10 * 60 * 1000,
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined
            }),
            saveUninitialized: false,
            secret: 'secret',
            resave: false,
            cookie: {
                sameSite: true,
                httpOnly: false,
                maxAge: 2 * 60 * 60 * 1000
            }
        }), passport.initialize(), passport.session())
            .forRoutes('*');
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                prisma_module_1.PrismaModule,
                auth_module_1.AuthModule,
                health_regen_module_1.HealthRegenModule,
                battle_module_1.BattleModule,
                characters_module_1.CharactersModule,
                training_module_1.TrainingModule,
            ],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
