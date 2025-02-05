import { Module } from '@nestjs/common';
import { CountriesModule } from './modules/countries/country.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    CountriesModule,
  ],
})
export class AppModule {}
