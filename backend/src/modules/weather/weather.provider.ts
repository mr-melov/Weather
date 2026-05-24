import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WeatherResponse } from 'src/types/weather';

@Injectable()
export class WeatherProvider {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('WEATHER_API_URL') ?? '';
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY') ?? '';
  }

  async getWeather(
    latitude: number,
    longitude: number,
    days: number,
    lang: string,
  ): Promise<WeatherResponse> {
    try {
      const params = new URLSearchParams({
        q: `${latitude},${longitude}`,
        days: days.toString(),
        key: this.apiKey,
        lang,
      });

      const response = await fetch(`${this.baseUrl}?${params}`, {
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        throw new Error('Provider request failed');
      }

      const data: WeatherResponse = await response.json();

      return data;
    } catch (error) {
      console.error(error);

      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to fetch current weather',
      );
    }
  }
}
