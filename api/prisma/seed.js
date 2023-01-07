"use strict";
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
var client_1 = require("@prisma/client");
var bcrypt = require("bcrypt");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    function seed() {
        return __awaiter(this, void 0, void 0, function () {
            var basicSkill;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createSkill({
                            name: 'Basic Attack',
                            description: 'Basic attack using all of your potential',
                            skillType: 'TAIJUTSU',
                            skillRank: 'STUDENT',
                            staminaCost: 5,
                            chakraCost: 5,
                            cooldown: 0,
                            battleLogAction: '{ATTACKER} attacks {DEFENDER} with all of their might',
                            basePower: 1,
                            genjutsuPercentRatio: 25,
                            taijutsuPercentRatio: 25,
                            ninjutsuPercentRatio: 25,
                            bukijutsuPercentRatio: 25,
                            speedPercentRatio: 25,
                            intelligencePercentRatio: 25,
                            strengthPercentRatio: 25,
                            endurancePercentRatio: 25,
                            element: null,
                            village: null
                        })];
                    case 1:
                        basicSkill = _a.sent();
                        // Create Test users
                        return [4 /*yield*/, createAdmin(basicSkill.id)];
                    case 2:
                        // Create Test users
                        _a.sent();
                        return [4 /*yield*/, createMod(basicSkill.id)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, createUser(basicSkill.id)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, createAi(basicSkill.id)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var prisma, createAdmin, createMod, createUser, createAi, createSkill, hashPassword, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prisma = new client_1.PrismaClient();
                createAdmin = function (skillId) { return __awaiter(void 0, void 0, void 0, function () {
                    var admin, _a, _b, char;
                    var _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _b = (_a = prisma.user).create;
                                _c = {};
                                _d = {
                                    email: 'admin@admin.com'
                                };
                                return [4 /*yield*/, hashPassword('admin')];
                            case 1: return [4 /*yield*/, _b.apply(_a, [(_c.data = (_d.password = _e.sent(),
                                        _d.role = 'ADMIN',
                                        _d.name = 'RoarAdmin',
                                        _d),
                                        _c)])];
                            case 2:
                                admin = _e.sent();
                                return [4 /*yield*/, prisma.character.create({
                                        data: {
                                            name: 'Kami',
                                            userId: admin.id,
                                            village: 'MIST',
                                            ownedSkills: {
                                                create: {
                                                    skillSkeletonId: skillId
                                                }
                                            }
                                        }
                                    })];
                            case 3:
                                char = _e.sent();
                                return [4 /*yield*/, prisma.characterPool.create({
                                        data: {
                                            characterId: char.id
                                        }
                                    })];
                            case 4:
                                _e.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                createMod = function (skillId) { return __awaiter(void 0, void 0, void 0, function () {
                    var moderator, _a, _b, char;
                    var _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _b = (_a = prisma.user).create;
                                _c = {};
                                _d = {
                                    email: 'mod@mod.com'
                                };
                                return [4 /*yield*/, hashPassword('mod')];
                            case 1: return [4 /*yield*/, _b.apply(_a, [(_c.data = (_d.password = _e.sent(),
                                        _d.role = 'MOD',
                                        _d.name = 'RoarModerator',
                                        _d),
                                        _c)])];
                            case 2:
                                moderator = _e.sent();
                                return [4 /*yield*/, prisma.character.create({
                                        data: {
                                            name: 'Moderator',
                                            userId: moderator.id,
                                            village: 'MIST',
                                            ownedSkills: {
                                                create: {
                                                    skillSkeletonId: skillId
                                                }
                                            }
                                        }
                                    })];
                            case 3:
                                char = _e.sent();
                                return [4 /*yield*/, prisma.characterPool.create({
                                        data: {
                                            characterId: char.id
                                        }
                                    })];
                            case 4:
                                _e.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                createUser = function (skillId) { return __awaiter(void 0, void 0, void 0, function () {
                    var user, _a, _b, char;
                    var _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _b = (_a = prisma.user).create;
                                _c = {};
                                _d = {
                                    email: 'user@user.com'
                                };
                                return [4 /*yield*/, hashPassword('user')];
                            case 1: return [4 /*yield*/, _b.apply(_a, [(_c.data = (_d.password = _e.sent(),
                                        _d.role = 'MOD',
                                        _d.name = 'RoarUser',
                                        _d),
                                        _c)])];
                            case 2:
                                user = _e.sent();
                                return [4 /*yield*/, prisma.character.create({
                                        data: {
                                            name: 'User',
                                            userId: user.id,
                                            village: 'MIST',
                                            ownedSkills: {
                                                create: {
                                                    skillSkeletonId: skillId
                                                }
                                            }
                                        }
                                    })];
                            case 3:
                                char = _e.sent();
                                return [4 /*yield*/, prisma.characterPool.create({
                                        data: {
                                            characterId: char.id
                                        }
                                    })];
                            case 4:
                                _e.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                createAi = function (skillId) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prisma.arenaCharacter.create({
                                    data: {
                                        name: 'Training Dummy',
                                        skills: {
                                            create: {
                                                skillSkeletonId: skillId
                                            }
                                        }
                                    }
                                })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, prisma.arenaCharacter.create({
                                        data: {
                                            name: 'Strong character',
                                            health: 100000,
                                            strength: 100,
                                            endurance: 100,
                                            intelligence: 100,
                                            speed: 100,
                                            offensiveNinjutsu: 10000,
                                            defensiveNinjutsu: 10000,
                                            offensiveTaijutsu: 10000,
                                            defensiveTaijutsu: 10000,
                                            offensiveGenjutsu: 10000,
                                            defensiveGenjutsu: 10000,
                                            offensiveBukijutsu: 10000,
                                            defensiveBukijutsu: 10000,
                                            skills: {
                                                create: {
                                                    skillSkeletonId: skillId
                                                }
                                            }
                                        }
                                    })];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                createSkill = function (createCommand) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prisma.skillSkeleton.create({
                                    data: {
                                        name: createCommand.name,
                                        description: createCommand.description,
                                        type: createCommand.skillType,
                                        skillRank: createCommand.skillRank,
                                        staminaCost: createCommand.staminaCost,
                                        chakraCost: createCommand.chakraCost,
                                        cooldown: createCommand.cooldown,
                                        battleLogAction: createCommand.battleLogAction,
                                        element: createCommand.element,
                                        genjutsuPercentRatio: createCommand.genjutsuPercentRatio,
                                        ninjutsuPercentRatio: createCommand.ninjutsuPercentRatio,
                                        taijutsuPercentRatio: createCommand.taijutsuPercentRatio,
                                        bukijutsuPercentRatio: createCommand.bukijutsuPercentRatio,
                                        speedPercentRatio: createCommand.speedPercentRatio,
                                        endurancePercentRatio: createCommand.endurancePercentRatio,
                                        strengthPercentRatio: createCommand.strengthPercentRatio,
                                        intelligencePercentRatio: createCommand.intelligencePercentRatio,
                                        villageBasis: createCommand.village
                                    }
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); };
                hashPassword = function (password) {
                    return bcrypt.hash(password, 10);
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 6]);
                return [4 /*yield*/, seed()];
            case 2:
                _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4:
                e_1 = _a.sent();
                console.error(e_1);
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                process.exit(1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); })();
