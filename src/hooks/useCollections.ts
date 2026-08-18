import { useCallback, useEffect, useState } from 'react';
import type { GeoLocation } from '@/types';
import { storage } from '@/lib/storage';

const MAX_RECENTS = 8;

export function useFavorites() {
  const [favorites, setFavorites] = useState<GeoLocation[]>(() => storage.getFavorites());

  useEffect(() => {
    storage.setFavorites(favorites);
  }, [favorites]);

  const isFavorite = useCallback(
    (loc: GeoLocation) =>
      favorites.some(
        (f) => f.latitude === loc.latitude && f.longitude === loc.longitude
      ),
    [favorites]
  );

  const toggleFavorite = useCallback((loc: GeoLocation) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) => f.latitude === loc.latitude && f.longitude === loc.longitude
      );
      if (exists) {
        return prev.filter(
          (f) => !(f.latitude === loc.latitude && f.longitude === loc.longitude)
        );
      }
      return [...prev, loc];
    });
  }, []);

  return { favorites, isFavorite, toggleFavorite };
}

export function useRecents() {
  const [recents, setRecents] = useState<GeoLocation[]>(() => storage.getRecents());

  useEffect(() => {
    storage.setRecents(recents);
  }, [recents]);

  const addRecent = useCallback((loc: GeoLocation) => {
    setRecents((prev) => {
      const filtered = prev.filter(
        (r) => !(r.latitude === loc.latitude && r.longitude === loc.longitude)
      );
      return [loc, ...filtered].slice(0, MAX_RECENTS);
    });
  }, []);

  return { recents, addRecent };
}
