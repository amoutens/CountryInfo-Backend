import { CountryService } from 'src/services/countries/country.service';
import { Controller, Get } from '@nestjs/common';
import { Country } from 'src/types/country.types';

@Controller('')
export class CountriesController {
  constructor(private readonly countryService: CountryService) {}

  @Get('countries')
  async getAvailableCountries(): Promise<Country[]> {
    return await this.countryService.getAvailableCountries();
  }
}
