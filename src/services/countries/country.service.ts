import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Country } from 'src/types/country.types';

@Injectable()
export class CountryService {
  private readonly availableCountryApi: string;

  constructor(private readonly configService: ConfigService) {
    this.availableCountryApi = this.configService.get<string>(
      'API_AVAILABLE_COUNTRIES',
      '',
    );
  }

  async getAvailableCountries(): Promise<Country[]> {
    try {
      const response = await fetch(this.availableCountryApi);
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = (await response.json()) as Country[];
      return data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch available countries: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
