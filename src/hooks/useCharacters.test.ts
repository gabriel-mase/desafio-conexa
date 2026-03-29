import { renderHook, waitFor } from '@testing-library/react';
import { useCharacters } from './useCharacters';
import * as api from '@/services/api';

jest.mock('@/services/api');

const mockData = {
  info: { count: 826, pages: 42, next: 'page2', prev: null },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive' as const,
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: '',
      episode: [],
      url: '',
      created: '',
    },
  ],
};

describe('useCharacters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns loading=true initially', () => {
    (api.fetchCharacters as jest.Mock).mockResolvedValue(mockData);
    const { result } = renderHook(() => useCharacters(1));
    expect(result.current.loading).toBe(true);
  });

  it('returns data after successful fetch', async () => {
    (api.fetchCharacters as jest.Mock).mockResolvedValue(mockData);
    const { result } = renderHook(() => useCharacters(1));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('returns error when fetch fails', async () => {
    (api.fetchCharacters as jest.Mock).mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useCharacters(1));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Network error');
    expect(result.current.data).toBeNull();
  });

  it('calls fetchCharacters with the correct page', async () => {
    (api.fetchCharacters as jest.Mock).mockResolvedValue(mockData);
    renderHook(() => useCharacters(3));
    expect(api.fetchCharacters).toHaveBeenCalledWith(3);
  });

  it('refetches when page changes', async () => {
    (api.fetchCharacters as jest.Mock).mockResolvedValue(mockData);
    const { rerender } = renderHook(({ page }) => useCharacters(page), {
      initialProps: { page: 1 },
    });
    await waitFor(() => expect(api.fetchCharacters).toHaveBeenCalledTimes(1));
    rerender({ page: 2 });
    await waitFor(() => expect(api.fetchCharacters).toHaveBeenCalledTimes(2));
    expect(api.fetchCharacters).toHaveBeenLastCalledWith(2);
  });
});
