import { Character, CharactersResponse, Episode } from '@/types';

const BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchCharacters(page: number = 1): Promise<CharactersResponse> {
  const res = await fetch(`${BASE_URL}/character?page=${page}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch characters: ${res.status}`);
  return res.json();
}

export async function fetchCharacterById(id: number): Promise<Character> {
  const res = await fetch(`${BASE_URL}/character/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch character: ${res.status}`);
  return res.json();
}

export async function fetchEpisodesByIds(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) return [];
  const endpoint =
    ids.length === 1
      ? `${BASE_URL}/episode/${ids[0]}`
      : `${BASE_URL}/episode/${ids.join(',')}`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`Failed to fetch episodes: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}
