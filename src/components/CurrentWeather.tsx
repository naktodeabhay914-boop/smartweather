import { MapPin, Heart, RefreshCw } from 'lucide-react';
import type { CurrentWeather, GeoLocation, Units, WeatherData } from '@/types';
import { getWeatherInfo } from '@/lib/weatherCodes';
import { formatFullDate, formatTemp, formatWindDir } from '@/lib/format';
import { WeatherIcon } from './WeatherIcon';
import { useClock } from '@/hooks/useClock';

interface Props {
  data: WeatherData;
  location: GeoLocation;
  units: Units;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onRefresh: () => void;
}

export function CurrentWeather({ data, location, units, isFavorite, onToggleFavorite, onRefresh }: Props) {
  const { current } = data;
  const info = getWeatherInfo(current.weatherCode);
  const iconName = current.isDay ? info.icon : nightIcon(info.icon);
  const clock = useClock(data.location.timezone);
  const windUnit = units === 'metric' ? 'km/h' : 'mph';

  return (
    <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-white/80">
            <MapPin className="h-4 w-4 shrink-0" />
            <h1 className="truncate text-xl font-semibold text-white sm:text-2xl">
              {location.name}
              {location.country && <span className="font-normal text-white/70">, {location.country}</span>}
            </h1>
          </div>
          <p className="mt-1 text-sm text-white/60">
            {formatFullDate(data.location.timezone)} · {clock}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRefresh}
            title="Refresh"
            className="rounded-full border border-white/20 bg-white/10 p-2 text-white/80 backdrop-blur-md transition hover:bg-white/20"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onToggleFavorite}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="rounded-full border border-white/20 bg-white/10 p-2 text-white/80 backdrop-blur-md transition hover:bg-white/20"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-rose-300 text-rose-300' : ''}`} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        <WeatherIcon name={iconName} className="h-24 w-24 shrink-0 text-white drop-shadow-lg sm:h-28 sm:w-28" />
        <div>
          <div className="flex items-start">
            <span className="text-6xl font-extralight leading-none text-white sm:text-7xl">
              {formatTemp(current.temperature, units).replace(/°[CF]$/, '')}
            </span>
            <span className="mt-2 text-2xl font-light text-white/80">°{units === 'metric' ? 'C' : 'F'}</span>
          </div>
          <p className="mt-2 text-lg font-medium text-white">{info.label}</p>
          <p className="text-sm text-white/70">{info.description}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/80">
        <span>Feels like <strong className="font-semibold text-white">{formatTemp(current.apparentTemperature, units)}</strong></span>
        <span>Humidity <strong className="font-semibold text-white">{current.humidity}%</strong></span>
        <span>Wind <strong className="font-semibold text-white">{Math.round(current.windSpeed)} {windUnit} {formatWindDir(current.windDirection)}</strong></span>
      </div>
    </div>
  );
}

function nightIcon(dayIcon: string): string {
  if (dayIcon === 'Sun') return 'Moon';
  if (dayIcon === 'CloudSun') return 'CloudMoon';
  return dayIcon;
}
