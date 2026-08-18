import { Droplets } from 'lucide-react';
import type { HourlyForecast, Units } from '@/types';
import { getWeatherInfo } from '@/lib/weatherCodes';
import { formatHour, formatTempUnit } from '@/lib/format';
import { WeatherIcon } from './WeatherIcon';

interface Props {
  hourly: HourlyForecast[];
  timezone: string;
  units: Units;
}

export function HourlyForecast({ hourly, timezone, units }: Props) {
  const items = hourly.slice(0, 24);
  return (
    <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/70">Hourly Forecast</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {items.map((h, i) => {
          const info = getWeatherInfo(h.weatherCode);
          const iconName = h.isDay ? info.icon : nightIcon(info.icon);
          return (
            <div
              key={i}
              className="flex min-w-[72px] flex-col items-center gap-1 rounded-2xl bg-white/5 px-3 py-3 text-center transition hover:bg-white/15"
            >
              <span className="text-xs font-medium text-white/70">
                {i === 0 ? 'Now' : formatHour(h.time, timezone)}
              </span>
              <WeatherIcon name={iconName} className="h-7 w-7 text-white" />
              <span className="text-base font-semibold text-white">{formatTempUnit(h.temperature)}</span>
              <span className="flex items-center gap-0.5 text-[11px] text-sky-200">
                <Droplets className="h-3 w-3" />
                {h.precipitationProbability}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function nightIcon(dayIcon: string): string {
  if (dayIcon === 'Sun') return 'Moon';
  if (dayIcon === 'CloudSun') return 'CloudMoon';
  return dayIcon;
}
