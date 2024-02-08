import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { StoreWeatherDto } from './dto/store-weather.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Weather } from './entities/weather.entity';
import { Repository } from 'typeorm';
import { getWeatherDto } from './dto/get-weather.dto';

@Injectable()
export class WeatherService {
  private readonly appid = process.env.OPEN_WEATHER_API_KEY ?? '';
  private readonly openWeatherLink = process.env.OPEN_WEATHER_LINK_3 ?? '';

  constructor(
    @InjectRepository(Weather)
    private weatherRepository: Repository<Weather>,
    private readonly httpService: HttpService,
  ) {}

  async storeWeatherData(params: StoreWeatherDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(this.openWeatherLink, {
          params: {
            ...params,
            exclude: params.part.join(','),
            appid: this.appid,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new Error(`Error: ${error.response.data}`);
          }),
        ),
    );

    await this.weatherRepository.save({
      ...params,
      part: params.part?.join(','),
      data,
    });

    return data;
  }

  async getWeatherData(params: getWeatherDto): Promise<Weather[]> {
    const data = await this.weatherRepository.find({
      where: {
        lon: params.lon,
        lat: params.lat,
        part: params.part?.join(','),
      },
    });

    return data;
  }
}
