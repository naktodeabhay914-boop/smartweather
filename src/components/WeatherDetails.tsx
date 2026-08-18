import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset, Compass, Sun } from 'lucide-react';
import type { CurrentWeather, Units } from '@/types';
import { formatPressure, formatTemp, formatTime, formatWindDir, uvCategory, visibilityKm } from '@/lib/format';

interface Props {
  current: CurrentWeather;
  units: Units;
  timezone: string;
}

interface Detail {
  icon: typeof Droplets;
  label: string;
  value: string;
  sub?: string;
}

export function WeatherDetails({ current, units, timezone }: Props) {
  const windUnit = units === 'metric' ? 'km/h' : 'mph';
  const uv = uvCategory(current.uvIndex);

  const details: Detail[] = [
    { icon: Droplets, label: 'Humidity', value: `${current.humidity}%` },
    { icon: Wind, label: 'Wind', value: `${Math.round(current.windSpeed)} ${windUnit}`, sub: formatWindDir(current.windDirection) },
    { icon: Compass, label: 'Direction', value: formatWindDir(current.windDirection), sub: `${current.windDirection}°` },
    { icon: Gauge, label: 'Pressure', value: formatPressure(current.pressure) },
    { icon: Eye, label: 'Visibility', value: visibilityKm(current.visibility) },
    { icon: Sun, label: 'UV Index', value: `${Math.round(current.uvIndex)}`, sub: uv.label },
    { icon: Sunrise, label: 'Sunrise', value: formatTime(current.sunrise, timezone) },
    { icon: Sunset, label: 'Sunset', value: formatTime(current.sunset, timezone) },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {details.map((d) => (
        <div
          key={d.label}
          className="group rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
        >
          <div className="flex items-center gap-2 text-white/70">
            <d.icon className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wide">{d.label}</span>
          </div>
          <p className="mt-2 text-xl font-semibold text-white">{d.value}</p>
          {d.sub && <p className="text-xs text-white/60">{d.sub}</p>}
        </div>
      ))}
    </div>
  );
}
