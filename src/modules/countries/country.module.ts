import { Module } from '@nestjs/common';
import { CountriesController } from 'src/controllers/countries/country.controller';
import { CountryService } from 'src/services/countries/country.service';

@Module({
  controllers: [CountriesController],
  providers: [CountryService],
})
export class CountriesModule {}
