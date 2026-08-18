import { Heart, Star } from 'lucide-react';
import type { GeoLocation } from '@/types';

interface Props {
  favorites: GeoLocation[];
  recents: GeoLocation[];
  current: GeoLocation | null;
  isFavorite: boolean;
  onSelect: (loc: GeoLocation) => void;
  onToggleFavorite: () => void;
}

export function Collections({
  favorites,
  recents,
  current,
  isFavorite,
  onSelect,
  onToggleFavorite,
}: Props) {
  const recentsToShow = recents.filter(
    (r) => !favorites.some((f) => f.latitude === r.latitude && f.longitude === r.longitude)
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      {current && (
        <button
          type="button"
          onClick={onToggleFavorite}
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium backdrop-blur-md transition ${
            isFavorite
              ? 'border-rose-300/40 bg-rose-500/20 text-rose-100'
              : 'border-white/20 bg-white/10 text-white/80 hover:bg-white/20'
          }`}
        >
          <Heart className={`h-3.5 w-3.5 ${isFavorite ? 'fill-rose-300 text-rose-300' : ''}`} />
          {isFavorite ? 'Saved' : 'Save'}
        </button>
      )}

      {favorites.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {favorites.map((f, i) => (
            <button
              key={`fav-${f.latitude}-${f.longitude}-${i}`}
              type="button"
              onClick={() => onSelect(f)}
              className="flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1.5 text-sm text-amber-100 backdrop-blur-md transition hover:bg-amber-400/20"
            >
              <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
              {f.name}
            </button>
          ))}
        </div>
      )}

      {recentsToShow.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {recentsToShow.map((r, i) => (
            <button
              key={`rec-${r.latitude}-${r.longitude}-${i}`}
              type="button"
              onClick={() => onSelect(r)}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/70 backdrop-blur-md transition hover:bg-white/15"
            >
              {r.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
