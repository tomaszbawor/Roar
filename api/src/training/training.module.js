"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TrainingModule = void 0;
var common_1 = require("@nestjs/common");
var training_service_1 = require("./training.service");
var training_controller_1 = require("./training.controller");
var prisma_module_1 = require("../prisma/prisma.module");
var level_up_service_1 = require("./level-up.service");
var TrainingModule = /** @class */ (function () {
    function TrainingModule() {
    }
    TrainingModule = __decorate([
        (0, common_1.Module)({
            imports: [prisma_module_1.PrismaModule],
            providers: [training_service_1.TrainingService, level_up_service_1.LevelUpService],
            controllers: [training_controller_1.TrainingController]
        })
    ], TrainingModule);
    return TrainingModule;
}());
exports.TrainingModule = TrainingModule;
