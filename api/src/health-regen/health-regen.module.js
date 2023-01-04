"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HealthRegenModule = void 0;
var common_1 = require("@nestjs/common");
var schedule_1 = require("@nestjs/schedule");
var regen_cron_service_1 = require("./regen-cron.service");
var prisma_module_1 = require("../prisma/prisma.module");
var HealthRegenModule = /** @class */ (function () {
    function HealthRegenModule() {
    }
    HealthRegenModule = __decorate([
        (0, common_1.Module)({
            imports: [prisma_module_1.PrismaModule, schedule_1.ScheduleModule.forRoot()],
            providers: [regen_cron_service_1.RegenCronService]
        })
    ], HealthRegenModule);
    return HealthRegenModule;
}());
exports.HealthRegenModule = HealthRegenModule;
