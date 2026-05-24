import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetWeatherDto } from './dto/get-weather.dto';
import { WeatherProvider } from './weather.provider';

@Injectable()
export class WeatherService {
  constructor(
    private readonly configService: ConfigService,
    private readonly provider: WeatherProvider,
  ) {}

  private resolve(dto: GetWeatherDto) {
    const latitude =
      dto.latitude ?? this.configService.getOrThrow<number>('DEF_LATITUDE');

    const longitude =
      dto.longitude ?? this.configService.getOrThrow<number>('DEF_LONGITUDE');

    const days = dto.days ?? this.configService.getOrThrow<number>('DEF_DAYS');

    const lang = dto.lang ?? this.configService.getOrThrow<string>('DEF_LANG');

    return {
      latitude,
      longitude,
      days,
      lang,
    };
  }

  async getWeather(dto: GetWeatherDto) {
    const { latitude, longitude, days, lang } = this.resolve(dto);

    return this.provider.getWeather(latitude, longitude, days, lang);
  }
}
