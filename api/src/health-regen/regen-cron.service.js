"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RegenCronService = void 0;
var common_1 = require("@nestjs/common");
var schedule_1 = require("@nestjs/schedule");
var characterRegen_1 = require("@common/engine/character/characterRegen");
var RegenCronService = /** @class */ (function () {
    function RegenCronService(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(RegenCronService_1.name);
    }
    RegenCronService_1 = RegenCronService;
    RegenCronService.prototype.handleCron = function () {
        var _this = this;
        this.prisma.$transaction(function () { return __awaiter(_this, void 0, void 0, function () {
            var now, after;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = performance.now();
                        return [4 /*yield*/, this.refreshPools()];
                    case 1:
                        _a.sent();
                        after = performance.now();
                        this.logger.debug("Regenerate took ".concat(after - now, " ms"));
                        return [2 /*return*/];
                }
            });
        }); });
    };
    RegenCronService.prototype.refreshPools = function () {
        return __awaiter(this, void 0, void 0, function () {
            var characterWithNotFullPool, _i, characterWithNotFullPool_1, character, regenRate, pool;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCharactersToRegenerate()];
                    case 1:
                        characterWithNotFullPool = _a.sent();
                        _i = 0, characterWithNotFullPool_1 = characterWithNotFullPool;
                        _a.label = 2;
                    case 2:
                        if (!(_i < characterWithNotFullPool_1.length)) return [3 /*break*/, 5];
                        character = characterWithNotFullPool_1[_i];
                        regenRate = (0, characterRegen_1.getRegenerationRateForCharacter)(character);
                        pool = character.characterPool;
                        if (!pool) {
                            throw Error('Character does not have a resource pool');
                        }
                        return [4 /*yield*/, this.prisma.characterPool.update({
                                where: {
                                    characterId: character.id
                                },
                                data: {
                                    health: this.updateOrMax(pool.health, pool.maxHealth, regenRate),
                                    stamina: this.updateOrMax(pool.stamina, pool.maxStamina, regenRate),
                                    chakra: this.updateOrMax(pool.chakra, pool.maxChakra, regenRate)
                                }
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RegenCronService.prototype.getCharactersToRegenerate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allCharacters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.character.findMany({
                            where: {
                                isInBattle: false
                            },
                            include: {
                                characterPool: true
                            }
                        })];
                    case 1:
                        allCharacters = _a.sent();
                        return [2 /*return*/, allCharacters.filter(function (character) {
                                var pool = character.characterPool;
                                if (!pool) {
                                    return false;
                                }
                                return (pool.health < pool.maxHealth ||
                                    pool.stamina < pool.maxStamina ||
                                    pool.chakra < pool.maxChakra);
                            })];
                }
            });
        });
    };
    RegenCronService.prototype.updateOrMax = function (old, max, increse) {
        return old + increse <= max ? old + increse : max;
    };
    var RegenCronService_1;
    __decorate([
        (0, schedule_1.Cron)('* * * * *')
    ], RegenCronService.prototype, "handleCron");
    RegenCronService = RegenCronService_1 = __decorate([
        (0, common_1.Injectable)()
    ], RegenCronService);
    return RegenCronService;
}());
exports.RegenCronService = RegenCronService;
