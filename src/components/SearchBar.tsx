import { useEffect, useRef, useState } from 'react';
import { Search, Loader2, MapPin, X } from 'lucide-react';
import type { GeoLocation } from '@/types';
import { searchCities, reverseGeocode, WeatherError } from '@/lib/weatherApi';

interface Props {
  onSelect: (loc: GeoLocation) => void;
  onUseLocation: () => void;
  locating: boolean;
}

export function SearchBar({ onSelect, onUseLocation, locating }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    if (!query.trim()) {
      setResults([]);
      setErr(null);
      return;
    }
    setLoading(true);
    setErr(null);
    debounce.current = setTimeout(async () => {
      try {
        const r = await searchCities(query);
        setResults(r);
        setOpen(true);
      } catch (e) {
        setErr(e instanceof WeatherError ? e.message : 'Search failed.');
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [query]);

  function pick(loc: GeoLocation) {
    onSelect(loc);
    setQuery('');
    setResults([]);
    setOpen(false);
  }

  return (
    <div ref={boxRef} className="relative w-full">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length && setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && results[0]) pick(results[0]);
              if (e.key === 'Escape') setOpen(false);
            }}
            placeholder="Search for a city..."
            aria-label="Search for a city"
            className="w-full rounded-2xl border border-white/20 bg-white/10 py-3 pl-10 pr-10 text-white placeholder-white/50 backdrop-blur-md outline-none transition focus:border-white/40 focus:bg-white/20"
          />
          {(query || loading) && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              aria-label="Clear search"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onUseLocation}
          disabled={locating}
          title="Use my location"
          className="flex shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20 disabled:opacity-50"
        >
          {locating ? <Loader2 className="h-5 w-5 animate-spin" /> : <MapPin className="h-5 w-5" />}
        </button>
      </div>

      {open && (results.length > 0 || err) && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/20 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
          {err && <p className="px-4 py-3 text-sm text-red-300">{err}</p>}
          {!err && results.length === 0 && (
            <p className="px-4 py-3 text-sm text-white/60">No cities found.</p>
          )}
          {results.map((r, i) => (
            <button
              key={`${r.latitude}-${r.longitude}-${i}`}
              type="button"
              onClick={() => pick(r)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-white transition hover:bg-white/10"
            >
              <MapPin className="h-4 w-4 shrink-0 text-white/50" />
              <span className="flex-1">
                <span className="font-medium">{r.name}</span>
                {r.admin1 && <span className="text-white/60">, {r.admin1}</span>}
                {r.country && <span className="text-white/60">, {r.country}</span>}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
