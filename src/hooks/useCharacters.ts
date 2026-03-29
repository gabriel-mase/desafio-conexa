'use client';

import { useState, useEffect } from 'react';
import { CharactersResponse } from '@/types';
import { fetchCharacters } from '@/services/api';

interface UseCharactersResult {
  data: CharactersResponse | null;
  loading: boolean;
  error: string | null;
}

export function useCharacters(page: number): UseCharactersResult {
  const [data, setData] = useState<CharactersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchCharacters(page)
      .then((res) => {
        if (!cancelled) setData(res);
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
  }, [page]);

  return { data, loading, error };
}
