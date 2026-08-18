import { useCallback, useEffect, useState } from 'react';
import { Sun, Moon, Thermometer } from 'lucide-react';
import type { GeoLocation, Units } from '@/types';
import { storage } from '@/lib/storage';
import { reverseGeocode, WeatherError } from '@/lib/weatherApi';
import { getWeatherInfo } from '@/lib/weatherCodes';
import { useTheme } from '@/hooks/useTheme';
import { useWeather } from '@/hooks/useWeather';
import { useFavorites, useRecents } from '@/hooks/useCollections';
import { SearchBar } from '@/components/SearchBar';
import { Collections } from '@/components/Collections';
import { CurrentWeather } from '@/components/CurrentWeather';
import { WeatherDetails } from '@/components/WeatherDetails';
import { HourlyForecast } from '@/components/HourlyForecast';
import { DailyForecast } from '@/components/DailyForecast';
import { SunArc } from '@/components/SunArc';
import { ErrorState, LoadingState } from '@/components/States';

const DEFAULT_LOCATION: GeoLocation = {
  name: 'London',
  country: 'United Kingdom',
  admin1: 'England',
  latitude: 51.5074,
  longitude: -0.1278,
  timezone: 'Europe/London',
};

function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const [units, setUnits] = useState<Units>(() => storage.getUnits());
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const { data, loading, error, location, load, refresh } = useWeather(units);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { recents, addRecent } = useRecents();

  // Initial load
  useEffect(() => {
    const last = storage.getLastLocation();
    load(last ?? DEFAULT_LOCATION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-refresh every 10 minutes
  useEffect(() => {
    const id = setInterval(() => {
      refresh();
    }, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, [refresh]);

  const handleSelect = useCallback(
    (loc: GeoLocation) => {
      addRecent(loc);
      load(loc);
    },
    [addRecent, load]
  );

  const handleUseLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const loc = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
          addRecent(loc);
          load(loc);
        } catch {
          setGeoError('Could not determine your location.');
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setGeoError('Location permission denied. Search for a city instead.');
      },
      { timeout: 10000 }
    );
  }, [addRecent, load]);

  const toggleUnits = useCallback(() => {
    setUnits((u) => {
      const next = u === 'metric' ? 'imperial' : 'metric';
      storage.setUnits(next);
      return next;
    });
  }, []);

  // Background based on current weather + day/night
  const code = data?.current.weatherCode ?? 0;
  const isDay = data?.current.isDay ?? true;
  const info = getWeatherInfo(code);
  const gradient = isDay ? info.gradientDay : info.gradientNight;

  const fav = location ? isFavorite(location) : false;

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${gradient} transition-[background] duration-1000`}>
      {/* subtle animated overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Sun className="h-6 w-6" />
            <span className="text-lg font-semibold tracking-tight">Skycast</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleUnits}
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
              title="Toggle temperature units"
            >
              <Thermometer className="h-4 w-4" />
              °{units === 'metric' ? 'C' : 'F'}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-2 text-white backdrop-blur-md transition hover:bg-white/20"
              title="Toggle dark / light mode"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </header>

        {/* Search */}
        <div className="mb-4">
          <SearchBar onSelect={handleSelect} onUseLocation={handleUseLocation} locating={locating} />
          {geoError && <p className="mt-2 text-sm text-amber-200">{geoError}</p>}
        </div>

        {/* Collections */}
        <div className="mb-6">
          <Collections
            favorites={favorites}
            recents={recents}
            current={location}
            isFavorite={fav}
            onSelect={handleSelect}
            onToggleFavorite={() => location && toggleFavorite(location)}
          />
        </div>

        {/* Content */}
        {loading && !data && <LoadingState />}
        {error && !loading && <ErrorState message={error} onRetry={refresh} />}
        {data && (
          <div className="flex flex-col gap-4">
            {location && (
              <CurrentWeather
                data={data}
                location={location}
                units={units}
                isFavorite={fav}
                onToggleFavorite={() => toggleFavorite(location)}
                onRefresh={refresh}
              />
            )}

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <WeatherDetails current={data.current} units={units} timezone={data.location.timezone} />
              </div>
              <SunArc current={data.current} timezone={data.location.timezone} />
            </div>

            <HourlyForecast hourly={data.hourly} timezone={data.location.timezone} units={units} />
            <DailyForecast daily={data.daily} timezone={data.location.timezone} units={units} />
          </div>
        )}

        <footer className="mt-8 text-center text-xs text-white/50">
          Weather data by Open-Meteo · Updates every 10 minutes
        </footer>
      </div>
    </div>
  );
}

export default App;
