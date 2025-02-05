import { CountryService } from 'src/services/countries/country.service';
import { Controller, Get, Param } from '@nestjs/common';
import { Country, CountryDetails } from 'src/types/country.types';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getAvailableCountries(): Promise<Country[]> {
    return await this.countryService.getAvailableCountries();
  }

  @Get(':countryCode')
  async getCountryDetails(
    @Param('countryCode') countryCode: string,
  ): Promise<CountryDetails> {
    return this.countryService.getCountryDetails(countryCode);
  }
}
