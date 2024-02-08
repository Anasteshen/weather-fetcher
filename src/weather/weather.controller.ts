import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { StoreWeatherDto } from './dto/store-weather.dto';
import { getWeatherDto } from './dto/get-weather.dto';
import { LoggingInterceptor } from 'src/interceptors/transform-weather-data';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async storeWeatherData(@Body() body: StoreWeatherDto) {
    return await this.weatherService.storeWeatherData(body);
  }
  @UseInterceptors(LoggingInterceptor)
  @Get()
  async getWeatherData(@Body() body: getWeatherDto) {
    return await this.weatherService.getWeatherData(body);
  }
}
