import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const result = {
          daily: [],
          hourly: [],
          current: {},
        };

        const formatEl = (el: any) => ({
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
      }),
    );
  }
}
