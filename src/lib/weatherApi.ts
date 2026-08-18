import type { DailyForecast, GeoLocation, HourlyForecast, Units, WeatherData } from '@/types';

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const REVERSE_GEO_URL = 'https://geocoding-api.open-meteo.com/v1/reverse';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

export class WeatherError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeatherError';
  }
}

export async function searchCities(query: string): Promise<GeoLocation[]> {
  const q = query.trim();
  if (!q) return [];
  const url = `${GEO_URL}?name=${encodeURIComponent(q)}&count=8&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new WeatherError('Could not search for cities. Please try again.');
  const data = await res.json();
  if (!data.results) return [];
  return data.results.map((r: any) => ({
    name: r.name,
    country: r.country ?? '',
    admin1: r.admin1,
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone ?? 'auto',
  }));
}

export async function reverseGeocode(lat: number, lon: number): Promise<GeoLocation> {
  try {
    const url = `${REVERSE_GEO_URL}?latitude=${lat}&longitude=${lon}&language=en&format=json`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const r = data.results[0];
        return {
          name: r.name,
          country: r.country ?? '',
          admin1: r.admin1,
          latitude: lat,
          longitude: lon,
          timezone: r.timezone ?? 'auto',
        };
      }
    }
  } catch {
    /* fall through to generic */
  }
  return {
    name: 'My Location',
    country: '',
    latitude: lat,
    longitude: lon,
    timezone: 'auto',
  };
}

export async function fetchWeather(
  location: GeoLocation,
  units: Units
): Promise<WeatherData> {
  const tempUnit = units === 'metric' ? 'celsius' : 'fahrenheit';
  const windUnit = units === 'metric' ? 'kmh' : 'mph';
  const precipUnit = units === 'metric' ? 'mm' : 'inch';

  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,surface_pressure,visibility,uv_index',
    hourly: 'temperature_2m,weather_code,precipitation_probability,is_day',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max',
    timezone: location.timezone || 'auto',
    forecast_days: '7',
    temperature_unit: tempUnit,
    wind_speed_unit: windUnit,
    precipitation_unit: precipUnit,
  });

  const res = await fetch(`${FORECAST_URL}?${params.toString()}`);
  if (!res.ok) throw new WeatherError('Could not load weather data. Please try again.');
  const data = await res.json();

  const current = {
    temperature: data.current.temperature_2m,
    apparentTemperature: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,
    pressure: data.current.pressure_msl ?? data.current.surface_pressure,
    visibility: data.current.visibility,
    weatherCode: data.current.weather_code,
    isDay: data.current.is_day === 1,
    uvIndex: data.current.uv_index ?? 0,
    sunrise: data.daily?.sunrise?.[0] ?? '',
    sunset: data.daily?.sunset?.[0] ?? '',
    time: data.current.time,
  };

  const tz = data.timezone ?? location.timezone ?? 'UTC';

  const hourly: HourlyForecast[] = [];
  const nowIdx = findCurrentHourIndex(data.hourly.time, data.utc_offset_seconds);
  const start = Math.max(0, nowIdx);
  for (let i = start; i < Math.min(start + 24, data.hourly.time.length); i++) {
    hourly.push({
      time: data.hourly.time[i],
      temperature: data.hourly.temperature_2m[i],
      weatherCode: data.hourly.weather_code[i],
      precipitationProbability: data.hourly.precipitation_probability?.[i] ?? 0,
      isDay: data.hourly.is_day[i] === 1,
    });
  }

  const daily: DailyForecast[] = (data.daily.time as string[]).map((date, i) => ({
    date,
    weatherCode: data.daily.weather_code[i],
    tempMax: data.daily.temperature_2m_max[i],
    tempMin: data.daily.temperature_2m_min[i],
    precipitationProbability: data.daily.precipitation_probability_max?.[i] ?? 0,
    sunrise: data.daily.sunrise[i],
    sunset: data.daily.sunset[i],
    uvIndexMax: data.daily.uv_index_max?.[i] ?? 0,
  }));

  return { location: { ...location, timezone: tz }, current, hourly, daily };
}

function findCurrentHourIndex(times: string[], utcOffset: number | undefined): number {
  const now = new Date();
  const nowMs = now.getTime() + (utcOffset ?? 0) * 1000;
  let best = 0;
  let bestDiff = Infinity;
  for (let i = 0; i < times.length; i++) {
    const t = new Date(times[i] + 'Z').getTime();
    const diff = Math.abs(t - nowMs);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return best;
}
