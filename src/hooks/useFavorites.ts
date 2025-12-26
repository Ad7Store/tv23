import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'wassi-live-tv-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((channelId: string) => {
    setFavorites(prev => 
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  }, []);

  const isFavorite = useCallback((channelId: string) => {
    return favorites.includes(channelId);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
};
