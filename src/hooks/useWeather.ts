import { useCallback, useEffect, useRef, useState } from 'react';
import type { GeoLocation, Units, WeatherData } from '@/types';
import { fetchWeather, WeatherError } from '@/lib/weatherApi';
import { storage } from '@/lib/storage';

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export function useWeather(units: Units) {
  const [state, setState] = useState<WeatherState>({ data: null, loading: true, error: null });
  const [location, setLocation] = useState<GeoLocation | null>(() => storage.getLastLocation());
  const unitsRef = useRef(units);
  unitsRef.current = units;

  const load = useCallback(async (loc: GeoLocation) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await fetchWeather(loc, unitsRef.current);
      storage.setLastLocation(loc);
      setLocation(loc);
      setState({ data, loading: false, error: null });
    } catch (e) {
      const msg = e instanceof WeatherError ? e.message : 'Something went wrong. Please try again.';
      setState({ data: null, loading: false, error: msg });
    }
  }, []);

  const refresh = useCallback(async () => {
    if (!location) return;
    setState((s) => ({ ...s, loading: true }));
    try {
      const data = await fetchWeather(location, unitsRef.current);
      setState({ data, loading: false, error: null });
    } catch (e) {
      const msg = e instanceof WeatherError ? e.message : 'Something went wrong. Please try again.';
      setState({ data: null, loading: false, error: msg });
    }
  }, [location]);

  // Re-fetch when units change (if we already have a location)
  useEffect(() => {
    if (location) load(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  return { ...state, location, load, refresh };
}
