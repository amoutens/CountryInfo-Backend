**CountryInfo** is a backend service built with **NestJS** and **TypeScript** that provides country-related data via REST API. It fetches real-time information from external APIs to deliver details such as available countries, border countries, historical population data, and flag images.

Scripts
The following scripts are available in package.json:

``` json
{
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "test": "jest",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix"
  }
}
```
Environment Variables
To configure environment variables, create a .env file in the root directory and add necessary values:

# .env.dev file
PORT=3000
API_AVAILABLE_COUNTRIES=https://date.nager.at/api/v3/AvailableCountries
API_COUNTRY_INFO=https://date.nager.at/api/v3/CountryInfo
API_POPULATION=https://countriesnow.space/api/v0.1/countries/population
API_FLAG=https://countriesnow.space/api/v0.1/countries/flag/images

Running the Server
Development Mode
Start the server with hot-reloading:

``` npm run start:dev ```
