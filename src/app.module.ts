import { Module } from '@nestjs/common';
import { CountriesModule } from './modules/countries/country.module';

@Module({
  imports: [CountriesModule],
})
export class AppModule {}
