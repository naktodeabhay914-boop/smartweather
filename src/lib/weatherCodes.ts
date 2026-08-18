import type { WeatherInfo } from '@/types';

// Open-Meteo WMO weather interpretation codes
// https://open-meteo.com/en/docs
export const WEATHER_CODES: Record<number, WeatherInfo> = {
  0: { label: 'Clear sky', description: 'A perfectly clear sky with no clouds in sight.', gradientDay: 'from-sky-400 via-sky-500 to-blue-600', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'Sun' },
  1: { label: 'Mainly clear', description: 'Mostly clear with a few scattered clouds.', gradientDay: 'from-sky-400 via-sky-500 to-blue-600', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'Sun' },
  2: { label: 'Partly cloudy', description: 'A mix of sun and clouds throughout the day.', gradientDay: 'from-sky-500 via-sky-600 to-blue-700', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudSun' },
  3: { label: 'Overcast', description: 'Clouds cover most of the sky.', gradientDay: 'from-slate-400 via-slate-500 to-slate-600', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'Cloud' },
  45: { label: 'Fog', description: 'Visibility is reduced due to fog.', gradientDay: 'from-slate-400 via-slate-500 to-slate-600', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudFog' },
  48: { label: 'Depositing rime fog', description: 'Fog with icy deposits forming on surfaces.', gradientDay: 'from-slate-400 via-slate-500 to-slate-600', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudFog' },
  51: { label: 'Light drizzle', description: 'Light, intermittent drizzle falling.', gradientDay: 'from-sky-600 via-slate-600 to-slate-700', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudDrizzle' },
  53: { label: 'Moderate drizzle', description: 'Steady drizzle falling.', gradientDay: 'from-sky-600 via-slate-600 to-slate-700', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudDrizzle' },
  55: { label: 'Dense drizzle', description: 'Heavy, dense drizzle.', gradientDay: 'from-sky-600 via-slate-600 to-slate-700', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudDrizzle' },
  56: { label: 'Light freezing drizzle', description: 'Light drizzle that freezes on contact.', gradientDay: 'from-sky-700 via-slate-700 to-slate-800', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudDrizzle' },
  57: { label: 'Dense freezing drizzle', description: 'Dense drizzle freezing on contact.', gradientDay: 'from-sky-700 via-slate-700 to-slate-800', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudDrizzle' },
  61: { label: 'Slight rain', description: 'Light rainfall.', gradientDay: 'from-sky-700 via-slate-700 to-slate-800', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudRain' },
  63: { label: 'Moderate rain', description: 'Moderate, steady rainfall.', gradientDay: 'from-sky-700 via-slate-700 to-slate-800', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudRain' },
  65: { label: 'Heavy rain', description: 'Heavy, intense rainfall.', gradientDay: 'from-slate-600 via-slate-700 to-slate-800', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudRainWind' },
  66: { label: 'Light freezing rain', description: 'Light rain freezing on contact.', gradientDay: 'from-slate-600 via-slate-700 to-slate-800', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudRainWind' },
  67: { label: 'Heavy freezing rain', description: 'Heavy rain freezing on contact.', gradientDay: 'from-slate-600 via-slate-700 to-slate-800', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudRainWind' },
  71: { label: 'Slight snow', description: 'Light snowfall.', gradientDay: 'from-slate-300 via-slate-400 to-slate-500', gradientNight: 'from-slate-700 via-slate-800 to-slate-900', icon: 'CloudSnow' },
  73: { label: 'Moderate snow', description: 'Moderate, steady snowfall.', gradientDay: 'from-slate-300 via-slate-400 to-slate-500', gradientNight: 'from-slate-700 via-slate-800 to-slate-900', icon: 'CloudSnow' },
  75: { label: 'Heavy snow', description: 'Heavy snowfall with accumulation.', gradientDay: 'from-slate-300 via-slate-400 to-slate-500', gradientNight: 'from-slate-700 via-slate-800 to-slate-900', icon: 'CloudSnow' },
  77: { label: 'Snow grains', description: 'Small snow grains falling.', gradientDay: 'from-slate-300 via-slate-400 to-slate-500', gradientNight: 'from-slate-700 via-slate-800 to-slate-900', icon: 'CloudSnow' },
  80: { label: 'Slight rain showers', description: 'Light, passing rain showers.', gradientDay: 'from-sky-700 via-slate-700 to-slate-800', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudRain' },
  81: { label: 'Moderate rain showers', description: 'Moderate rain showers.', gradientDay: 'from-sky-700 via-slate-700 to-slate-800', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudRain' },
  82: { label: 'Violent rain showers', description: 'Violent, heavy rain showers.', gradientDay: 'from-slate-600 via-slate-700 to-slate-800', gradientNight: 'from-slate-800 via-slate-900 to-black', icon: 'CloudRainWind' },
  85: { label: 'Slight snow showers', description: 'Light snow showers.', gradientDay: 'from-slate-300 via-slate-400 to-slate-500', gradientNight: 'from-slate-700 via-slate-800 to-slate-900', icon: 'CloudSnow' },
  86: { label: 'Heavy snow showers', description: 'Heavy snow showers.', gradientDay: 'from-slate-300 via-slate-400 to-slate-500', gradientNight: 'from-slate-700 via-slate-800 to-slate-900', icon: 'CloudSnow' },
  95: { label: 'Thunderstorm', description: 'A thunderstorm with rain.', gradientDay: 'from-slate-700 via-slate-800 to-slate-900', gradientNight: 'from-slate-900 via-black to-black', icon: 'CloudLightning' },
  96: { label: 'Thunderstorm with slight hail', description: 'Thunderstorm with light hail.', gradientDay: 'from-slate-700 via-slate-800 to-slate-900', gradientNight: 'from-slate-900 via-black to-black', icon: 'CloudLightning' },
  99: { label: 'Thunderstorm with heavy hail', description: 'Thunderstorm with heavy hail.', gradientDay: 'from-slate-700 via-slate-800 to-slate-900', gradientNight: 'from-slate-900 via-black to-black', icon: 'CloudLightning' },
};

export function getWeatherInfo(code: number): WeatherInfo {
  return WEATHER_CODES[code] ?? WEATHER_CODES[0];
}
