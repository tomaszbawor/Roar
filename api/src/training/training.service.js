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
exports.TrainingService = void 0;
var common_1 = require("@nestjs/common");
var trainingTypes_1 = require("@common/engine/training/trainingTypes");
var TrainingService = /** @class */ (function () {
    function TrainingService(prisma, levelUpService) {
        this.prisma = prisma;
        this.levelUpService = levelUpService;
    }
    TrainingService.prototype.train = function (userId, trainRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var character, unitTrainCost, trainCost, skillIncrement, experienceGained, trainedCharacter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.character.findUnique({
                            where: {
                                userId: userId
                            },
                            include: {
                                characterPool: true
                            }
                        })];
                    case 1:
                        character = _a.sent();
                        this.validateTrainRequest(character.characterPool, trainRequest);
                        unitTrainCost = trainingTypes_1.trainingCostPerUnit[trainRequest.trainType];
                        trainCost = {
                            chakra: unitTrainCost.chakra * trainRequest.value,
                            stamina: unitTrainCost.stamina * trainRequest.value
                        };
                        skillIncrement = this.getStatChangeAfterTraining(trainRequest);
                        experienceGained = this.calculateGainedExperience(trainCost);
                        return [4 /*yield*/, this.prisma.character.update({
                                where: {
                                    userId: userId
                                },
                                data: {
                                    characterPool: {
                                        update: {
                                            experience: {
                                                increment: experienceGained
                                            },
                                            chakra: {
                                                decrement: trainCost.chakra
                                            },
                                            stamina: {
                                                decrement: trainCost.stamina
                                            },
                                            maxChakra: {
                                                increment: skillIncrement.maxChakra
                                            },
                                            maxStamina: {
                                                increment: skillIncrement.maxStamina
                                            }
                                        }
                                    },
                                    offensiveNinjutsu: {
                                        increment: skillIncrement.offensiveNinjutsu
                                    },
                                    defensiveNinjutsu: {
                                        increment: skillIncrement.defensiveNinjutsu
                                    },
                                    offensiveTaijutsu: {
                                        increment: skillIncrement.offensiveTaijutsu
                                    },
                                    defensiveTaijutsu: {
                                        increment: skillIncrement.defensiveTaijutsu
                                    },
                                    offensiveGenjutsu: {
                                        increment: skillIncrement.offensiveGenjutsu
                                    },
                                    defensiveGenjutsu: {
                                        increment: skillIncrement.defensiveGenjutsu
                                    },
                                    offensiveBukijutsu: {
                                        increment: skillIncrement.offensiveBukijutsu
                                    },
                                    defensiveBukijutsu: {
                                        increment: skillIncrement.defensiveBukijutsu
                                    },
                                    strength: {
                                        increment: skillIncrement.strength
                                    },
                                    speed: {
                                        increment: skillIncrement.speed
                                    },
                                    intelligence: {
                                        increment: skillIncrement.intelligence
                                    },
                                    endurance: {
                                        increment: skillIncrement.endurance
                                    }
                                },
                                include: {
                                    characterPool: true
                                }
                            })];
                    case 2:
                        trainedCharacter = _a.sent();
                        return [2 /*return*/, this.levelUpService.checkForLevelUp(trainedCharacter)];
                }
            });
        });
    };
    TrainingService.prototype.calculateGainedExperience = function (trainCost) {
        var totalResourcesSpend = trainCost.chakra + trainCost.stamina;
        return Math.round(totalResourcesSpend / 10);
    };
    TrainingService.prototype.validateTrainRequest = function (pool, trainCommand) {
        var unitTrainingCost = trainingTypes_1.trainingCostPerUnit[trainCommand.trainType];
        var totalCost = {
            chakra: unitTrainingCost.chakra * trainCommand.value,
            stamina: unitTrainingCost.stamina * trainCommand.value
        };
        return pool.stamina >= totalCost.stamina && pool.chakra >= totalCost.chakra;
    };
    TrainingService.prototype.getStatChangeAfterTraining = function (tc) {
        var ti = {
            offensiveNinjutsu: 0,
            offensiveTaijutsu: 0,
            offensiveGenjutsu: 0,
            offensiveBukijutsu: 0,
            defensiveNinjutsu: 0,
            defensiveTaijutsu: 0,
            defensiveGenjutsu: 0,
            defensiveBukijutsu: 0,
            endurance: 0,
            intelligence: 0,
            maxChakra: 0,
            maxHealth: 0,
            maxStamina: 0,
            speed: 0,
            strength: 0
        };
        switch (tc.trainType) {
            case trainingTypes_1.PoolExtendTraining.CHAKRA_EXTEND: {
                ti.maxChakra = tc.value;
                break;
            }
            case trainingTypes_1.PoolExtendTraining.STAMINA_EXTEND: {
                ti.maxStamina = tc.value;
                break;
            }
            case trainingTypes_1.TrainingSkillOptions.OFFENSIVE_GENJUTSU: {
                ti.offensiveGenjutsu = tc.value;
                break;
            }
            case trainingTypes_1.TrainingSkillOptions.DEFENSIVE_GENJUTSU: {
                ti.defensiveGenjutsu = tc.value;
                break;
            }
            case trainingTypes_1.TrainingSkillOptions.OFFENSIVE_NINJUTSTU: {
                ti.offensiveNinjutsu = tc.value;
                break;
            }
            case trainingTypes_1.TrainingSkillOptions.DEFENSIVE_NINJUTSTU: {
                ti.defensiveNinjutsu = tc.value;
                break;
            }
            case trainingTypes_1.TrainingSkillOptions.OFFENSIVE_TAIJUTSU: {
                ti.offensiveTaijutsu = tc.value;
                break;
            }
            case trainingTypes_1.TrainingSkillOptions.DEFENSIVE_TAIJUTSU: {
                ti.defensiveTaijutsu = tc.value;
                break;
            }
            case trainingTypes_1.TrainingSkillOptions.OFFENSIVE_BUKIJUTSU: {
                ti.offensiveBukijutsu = tc.value;
                break;
            }
            case trainingTypes_1.TrainingSkillOptions.DEFENSIVE_BUKIJUTSU: {
                ti.defensiveBukijutsu = tc.value;
                break;
            }
            case trainingTypes_1.GeneralStats.ENDURANCE: {
                ti.endurance = tc.value;
                break;
            }
            case trainingTypes_1.GeneralStats.INTELLIGENCE: {
                ti.intelligence = tc.value;
                break;
            }
            case trainingTypes_1.GeneralStats.SPEED: {
                ti.speed = tc.value;
                break;
            }
            case trainingTypes_1.GeneralStats.STRENGTH: {
                ti.strength = tc.value;
            }
        }
        return ti;
    };
    TrainingService = __decorate([
        (0, common_1.Injectable)()
    ], TrainingService);
    return TrainingService;
}());
exports.TrainingService = TrainingService;
