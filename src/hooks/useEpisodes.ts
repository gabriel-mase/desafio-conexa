'use client';

import { useState, useEffect } from 'react';
import { Episode } from '@/types';
import { fetchEpisodesByIds } from '@/services/api';

interface UseEpisodesResult {
  episodes: Episode[];
  loading: boolean;
  error: string | null;
}

export function useEpisodes(ids: number[]): UseEpisodesResult {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const key = ids.join(',');

  useEffect(() => {
    if (ids.length === 0) {
      setEpisodes([]);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchEpisodesByIds(ids)
      .then((data) => {
        if (!cancelled) setEpisodes(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { episodes, loading, error };
}
