import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Country } from 'src/types/country.types';

@Injectable()
export class CountryService {
  private readonly apiUrl = 'https://date.nager.at/api/v3/AvailableCountries';
  async getAvailableCountries(): Promise<Country[]> {
    try {
      const response = await fetch(this.apiUrl);
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
