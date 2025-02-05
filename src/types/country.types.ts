export type Country = {
  countryCode: string;
  name: string;
};

type PopulationCount = {
  year: number;
  value: number;
};

export type PopulationData = {
  error: boolean;
  msg: string;
  data: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: PopulationCount[];
  };
};

export type CountryInfo = {
  name: string;
  countryCode: string;
  borders: Border[];
};

export type Border = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Border[] | null;
};

export type FlagData = {
  error: boolean;
  msg: string;
  data: { name: string; flag: string; iso2: string; iso3: string };
};
export type CountryDetails = {
  country: Country;
  countryInfo: Border[];
  populationData: PopulationCount[];
  flagData: string;
};
