import { Sunrise, Sunset } from 'lucide-react';
import type { CurrentWeather } from '@/types';
import { formatTime } from '@/lib/format';

export function SunArc({ current, timezone }: { current: CurrentWeather; timezone: string }) {
  const now = Date.now();
  const sunrise = new Date(current.sunrise).getTime();
  const sunset = new Date(current.sunset).getTime();
  const progress = Math.min(Math.max((now - sunrise) / (sunset - sunrise), 0), 1);

  const width = 240;
  const height = 80;
  const radius = width / 2;
  const cx = width / 2;
  const cy = height;
  const angle = Math.PI - progress * Math.PI;
  const dotX = cx + radius * Math.cos(angle);
  const dotY = cy - radius * Math.sin(angle);

  return (
    <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/70">Sun Position</h2>
      <div className="flex flex-col items-center">
        <svg viewBox={`0 0 ${width} ${height + 10}`} className="w-full max-w-[280px]">
          <defs>
            <linearGradient id="sunarc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
          </defs>
          <path
            d={`M 0 ${cy} A ${radius} ${radius} 0 0 1 ${width} ${cy}`}
            fill="none"
            stroke="url(#sunarc)"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            opacity="0.7"
          />
          <line x1="0" y1={cy} x2={width} y2={cy} stroke="white" strokeOpacity="0.2" strokeWidth="1" />
          {progress > 0 && progress < 1 && (
            <circle cx={dotX} cy={dotY} r="7" fill="#fde68a" stroke="white" strokeWidth="1.5" />
          )}
        </svg>
        <div className="mt-2 flex w-full max-w-[280px] items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-white/80">
            <Sunrise className="h-4 w-4 text-amber-300" />
            {formatTime(current.sunrise, timezone)}
          </div>
          <div className="flex items-center gap-1.5 text-white/80">
            <Sunset className="h-4 w-4 text-orange-300" />
            {formatTime(current.sunset, timezone)}
          </div>
        </div>
      </div>
    </div>
  );
}
