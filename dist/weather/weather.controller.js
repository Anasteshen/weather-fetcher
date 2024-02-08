"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherController = void 0;
const common_1 = require("@nestjs/common");
const weather_service_1 = require("./weather.service");
const store_weather_dto_1 = require("./dto/store-weather.dto");
const get_weather_dto_1 = require("./dto/get-weather.dto");
const transform_weather_data_1 = require("../interceptors/transform-weather-data");
let WeatherController = class WeatherController {
    constructor(weatherService) {
        this.weatherService = weatherService;
    }
    async storeWeatherData(body) {
        return await this.weatherService.storeWeatherData(body);
    }
    async getWeatherData(body) {
        return await this.weatherService.getWeatherData(body);
    }
};
exports.WeatherController = WeatherController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_weather_dto_1.StoreWeatherDto]),
    __metadata("design:returntype", Promise)
], WeatherController.prototype, "storeWeatherData", null);
__decorate([
    (0, common_1.UseInterceptors)(transform_weather_data_1.LoggingInterceptor),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_weather_dto_1.getWeatherDto]),
    __metadata("design:returntype", Promise)
], WeatherController.prototype, "getWeatherData", null);
exports.WeatherController = WeatherController = __decorate([
    (0, common_1.Controller)('weather'),
    __metadata("design:paramtypes", [weather_service_1.WeatherService])
], WeatherController);
//# sourceMappingURL=weather.controller.js.map