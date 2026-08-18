import { Droplets } from 'lucide-react';
import type { DailyForecast, Units } from '@/types';
import { getWeatherInfo } from '@/lib/weatherCodes';
import { formatDay, formatTempUnit } from '@/lib/format';
import { WeatherIcon } from './WeatherIcon';

interface Props {
  daily: DailyForecast[];
  timezone: string;
  units: Units;
}

export function DailyForecast({ daily, timezone }: Props) {
  const maxOverall = Math.max(...daily.map((d) => d.tempMax));
  const minOverall = Math.min(...daily.map((d) => d.tempMin));
  const range = Math.max(maxOverall - minOverall, 1);

  return (
    <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/70">
        {daily.length}-Day Forecast
      </h2>
      <div className="flex flex-col gap-1">
        {daily.map((d, i) => {
          const info = getWeatherInfo(d.weatherCode);
          const leftPct = ((d.tempMin - minOverall) / range) * 100;
          const widthPct = ((d.tempMax - d.tempMin) / range) * 100;
          return (
            <div
              key={i}
              className="grid grid-cols-[3rem_2rem_1fr_4rem] items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-white/10 sm:grid-cols-[5rem_2.5rem_1fr_5rem]"
            >
              <span className="text-sm font-medium text-white">
                {i === 0 ? 'Today' : formatDay(d.date, timezone)}
              </span>
              <WeatherIcon name={info.icon} className="h-7 w-7 text-white" />
              <div className="flex items-center gap-2">
                <span className="w-8 text-right text-sm text-white/60">{formatTempUnit(d.tempMin)}</span>
                <div className="relative h-1.5 flex-1 rounded-full bg-white/15">
                  <div
                    className="absolute h-1.5 rounded-full bg-gradient-to-r from-sky-300 via-amber-300 to-orange-400"
                    style={{ left: `${leftPct}%`, width: `${Math.max(widthPct, 8)}%` }}
                  />
                </div>
                <span className="w-8 text-sm font-semibold text-white">{formatTempUnit(d.tempMax)}</span>
              </div>
              <span className="flex items-center justify-end gap-0.5 text-xs text-sky-200">
                <Droplets className="h-3 w-3" />
                {d.precipitationProbability}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
