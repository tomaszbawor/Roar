"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BattleModule = void 0;
var common_1 = require("@nestjs/common");
var battle_controller_1 = require("./battle.controller");
var battle_service_1 = require("./battle.service");
var arena_service_1 = require("./arena/arena.service");
var prisma_module_1 = require("../prisma/prisma.module");
var characters_module_1 = require("../characters/characters.module");
var BattleModule = /** @class */ (function () {
    function BattleModule() {
    }
    BattleModule = __decorate([
        (0, common_1.Module)({
            imports: [prisma_module_1.PrismaModule, characters_module_1.CharactersModule],
            controllers: [battle_controller_1.BattleController],
            providers: [battle_service_1.BattleService, arena_service_1.ArenaService]
        })
    ], BattleModule);
    return BattleModule;
}());
exports.BattleModule = BattleModule;
