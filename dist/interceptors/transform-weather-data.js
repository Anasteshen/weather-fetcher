"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let LoggingInterceptor = class LoggingInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((response) => {
            const result = {
                daily: [],
                hourly: [],
                current: {},
            };
            const formatEl = (el) => ({
                sunrise: el.sunrise ?? 'N/A',
                sunset: el.sunset ?? 'N/A',
                temp: el.temp ?? 'N/A',
                feels_like: el.feels_like ?? 'N/A',
                pressure: el.pressure ?? 'N/A',
                humidity: el.humidity ?? 'N/A',
                uvi: el.uvi ?? 'N/A',
                wind_speed: el.wind_speed ?? 'N/A',
            });
            for (const payload of response) {
                const data = payload.data;
                if (data.hasOwnProperty('daily')) {
                    for (const el of data.daily) {
                        result.daily.push(formatEl(el));
                    }
                }
                if (data.hasOwnProperty('hourly')) {
                    for (const el of data.hourly) {
                        result.hourly.push(formatEl(el));
                    }
                }
                if (data.hasOwnProperty('current')) {
                    result.current = formatEl(data.current);
                }
            }
            return result;
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
//# sourceMappingURL=transform-weather-data.js.map