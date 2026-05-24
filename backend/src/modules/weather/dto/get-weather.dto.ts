import { Type } from 'class-transformer';

import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetWeatherDto {
  @Type(() => Number)
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @Type(() => Number)
  @IsOptional()
  @IsLongitude()
  longitude?: number;

  @IsOptional()
  @IsString()
  lang?: string;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(14)
  days?: number;
}
