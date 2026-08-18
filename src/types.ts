export type Units = 'metric' | 'imperial';

export interface GeoLocation {
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  weatherCode: number;
  isDay: boolean;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  time: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
  isDay: boolean;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationProbability: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
}

export interface WeatherData {
  location: GeoLocation;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

export interface WeatherInfo {
  label: string;
  description: string;
  /** Tailwind gradient classes for the animated background, keyed by day/night. */
  gradientDay: string;
  gradientNight: string;
  /** Lucide icon name from the weather icon map. */
  icon: string;
}

export type Theme = 'light' | 'dark';
