import { Controller, Get, Query } from '@nestjs/common';
import { GetWeatherDto } from './dto/get-weather.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get()
  getWeather(@Query() dto: GetWeatherDto) {
    return this.weatherService.getWeather(dto);
  }
}
