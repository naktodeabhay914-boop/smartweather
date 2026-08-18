import type { GeoLocation, Theme, Units } from '@/types';

const KEYS = {
  theme: 'weather.theme',
  units: 'weather.units',
  favorites: 'weather.favorites',
  recents: 'weather.recents',
  lastLocation: 'weather.lastLocation',
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota / privacy mode */
  }
}

export const storage = {
  getTheme: (): Theme => read<Theme>(KEYS.theme, 'dark'),
  setTheme: (t: Theme) => write(KEYS.theme, t),

  getUnits: (): Units => read<Units>(KEYS.units, 'metric'),
  setUnits: (u: Units) => write(KEYS.units, u),

  getFavorites: (): GeoLocation[] => read<GeoLocation[]>(KEYS.favorites, []),
  setFavorites: (f: GeoLocation[]) => write(KEYS.favorites, f),

  getRecents: (): GeoLocation[] => read<GeoLocation[]>(KEYS.recents, []),
  setRecents: (r: GeoLocation[]) => write(KEYS.recents, r),

  getLastLocation: (): GeoLocation | null => read<GeoLocation | null>(KEYS.lastLocation, null),
  setLastLocation: (l: GeoLocation) => write(KEYS.lastLocation, l),
};
