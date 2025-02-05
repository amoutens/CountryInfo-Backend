import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  Country,
  CountryDetails,
  CountryInfo,
  FlagData,
  PopulationData,
} from 'src/types/country.types';

@Injectable()
export class CountryService {
  private readonly availableCountryApi: string;
  private readonly countryInfoApi: string;
  private readonly populationApi: string;
  private readonly flagApi: string;

  constructor(private readonly configService: ConfigService) {
    this.availableCountryApi = this.configService.get<string>(
      'API_AVAILABLE_COUNTRIES',
      '',
    );
    this.countryInfoApi = this.configService.get<string>(
      'API_COUNTRY_INFO',
      '',
    );
    this.populationApi = this.configService.get<string>('API_POPULATION', '');
    this.flagApi = this.configService.get<string>('API_FLAG', '');
  }

  async getAvailableCountries(): Promise<Country[]> {
    const response = await fetch(this.availableCountryApi);
    if (!response.ok) {
      throw new HttpException(
        `Fetch failed: ${response.statusText}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = (await response.json()) as Country[];

    return data;
  }

  async getCountryDetails(countryCode: string): Promise<CountryDetails> {
    const countries = await this.getAvailableCountries();
    const country = countries.find((c) => c.countryCode === countryCode);
    if (!country)
      throw new HttpException(
        `Country ${countryCode} not found`,
        HttpStatus.NOT_FOUND,
      );
    const countryInfoRes = await fetch(`${this.countryInfoApi}/${countryCode}`);
    const countryInfo = (await countryInfoRes.json()) as CountryInfo;

    const populationRes = await fetch(this.populationApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: country.name }),
    });

    const populationData = (await populationRes.json()) as PopulationData;

    const flagRes = await fetch(this.flagApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: country.name }),
    });
    const flagData = (await flagRes.json()) as FlagData;

    return {
      country: {
        name: country.name,
        countryCode: country.countryCode,
      },
      countryInfo: countryInfo.borders,
      populationData: populationData.data.populationCounts,
      flagData: flagData.data.flag,
    };
  }
}
