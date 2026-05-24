import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './modules/weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
    }),
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
