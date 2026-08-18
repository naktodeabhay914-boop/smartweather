import type { Units } from '@/types';

export function formatTemp(value: number, units: Units): string {
  return `${Math.round(value)}°${units === 'metric' ? 'C' : 'F'}`;
}

export function formatTempUnit(value: number): string {
  return `${Math.round(value)}°`;
}

export function formatWindDir(degrees: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(degrees / 22.5) % 16];
}

export function formatPressure(hpa: number): string {
  return `${Math.round(hpa)} hPa`;
}

export function formatTime(iso: string, timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: timezone,
    }).format(new Date(iso));
  } catch {
    return new Date(iso).toLocaleTimeString();
  }
}

export function formatHour(iso: string, timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      timeZone: timezone,
    }).format(new Date(iso));
  } catch {
    return new Date(iso).toLocaleTimeString([], { hour: 'numeric' });
  }
}

export function formatDay(iso: string, timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      timeZone: timezone,
    }).format(new Date(iso));
  } catch {
    return new Date(iso).toLocaleDateString([], { weekday: 'short' });
  }
}

export function formatFullDate(timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      timeZone: timezone,
    }).format(new Date());
  } catch {
    return new Date().toLocaleDateString();
  }
}

export function formatClock(timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: timezone,
    }).format(new Date());
  } catch {
    return new Date().toLocaleTimeString();
  }
}

export function uvCategory(uv: number): { label: string; color: string } {
  if (uv < 3) return { label: 'Low', color: 'text-green-300' };
  if (uv < 6) return { label: 'Moderate', color: 'text-yellow-300' };
  if (uv < 8) return { label: 'High', color: 'text-orange-300' };
  if (uv < 11) return { label: 'Very High', color: 'text-red-300' };
  return { label: 'Extreme', color: 'text-fuchsia-300' };
}

export function visibilityKm(meters: number): string {
  return `${(meters / 1000).toFixed(1)} km`;
}
