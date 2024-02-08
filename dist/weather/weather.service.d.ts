import { HttpService } from '@nestjs/axios';
import { StoreWeatherDto } from './dto/store-weather.dto';
import { Weather } from './entities/weather.entity';
import { Repository } from 'typeorm';
import { getWeatherDto } from './dto/get-weather.dto';
export declare class WeatherService {
    private weatherRepository;
    private readonly httpService;
    private readonly appid;
    private readonly openWeatherLink;
    constructor(weatherRepository: Repository<Weather>, httpService: HttpService);
    storeWeatherData(params: StoreWeatherDto): Promise<any>;
    getWeatherData(params: getWeatherDto): Promise<Weather[]>;
}
