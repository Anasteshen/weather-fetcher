import { WeatherService } from './weather.service';
import { StoreWeatherDto } from './dto/store-weather.dto';
import { getWeatherDto } from './dto/get-weather.dto';
export declare class WeatherController {
    private readonly weatherService;
    constructor(weatherService: WeatherService);
    storeWeatherData(body: StoreWeatherDto): Promise<any>;
    getWeatherData(body: getWeatherDto): Promise<import("./entities/weather.entity").Weather[]>;
}
