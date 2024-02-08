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
exports.WeatherService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const typeorm_1 = require("@nestjs/typeorm");
const weather_entity_1 = require("./entities/weather.entity");
const typeorm_2 = require("typeorm");
let WeatherService = class WeatherService {
    constructor(weatherRepository, httpService) {
        this.weatherRepository = weatherRepository;
        this.httpService = httpService;
        this.appid = process.env.OPEN_WEATHER_API_KEY ?? '';
        this.openWeatherLink = process.env.OPEN_WEATHER_LINK_3 ?? '';
    }
    async storeWeatherData(params) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(this.openWeatherLink, {
            params: {
                ...params,
                exclude: params.part.join(','),
                appid: this.appid,
            },
        })
            .pipe((0, rxjs_1.catchError)((error) => {
            throw new Error(`Error: ${error.response.data}`);
        })));
        await this.weatherRepository.save({
            ...params,
            part: params.part?.join(','),
            data,
        });
        return data;
    }
    async getWeatherData(params) {
        const data = await this.weatherRepository.find({
            where: {
                lon: params.lon,
                lat: params.lat,
                part: params.part?.join(','),
            },
        });
        return data;
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(weather_entity_1.Weather)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService])
], WeatherService);
//# sourceMappingURL=weather.service.js.map