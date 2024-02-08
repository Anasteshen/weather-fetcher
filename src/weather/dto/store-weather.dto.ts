import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Part } from './part.enum';

export class StoreWeatherDto {
  @IsNumber()
  @Max(90)
  @Min(-90)
  lat: number;

  @IsNumber()
  @Max(180)
  @Min(-180)
  lon: number;

  @IsOptional()
  part?: Part[];
}
