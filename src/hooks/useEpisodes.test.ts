import { renderHook, waitFor } from '@testing-library/react';
import { useEpisodes } from './useEpisodes';
import * as api from '@/services/api';

jest.mock('@/services/api');

const mockEpisodes = [
  {
    id: 1,
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
    characters: [],
    url: '',
    created: '',
  },
];

describe('useEpisodes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns empty episodes and no loading when ids is empty', () => {
    const { result } = renderHook(() => useEpisodes([]));
    expect(result.current.episodes).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('fetches episodes when ids are provided', async () => {
    (api.fetchEpisodesByIds as jest.Mock).mockResolvedValue(mockEpisodes);
    const { result } = renderHook(() => useEpisodes([1]));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.episodes).toEqual(mockEpisodes);
  });

  it('returns error when fetch fails', async () => {
    (api.fetchEpisodesByIds as jest.Mock).mockRejectedValue(new Error('API error'));
    const { result } = renderHook(() => useEpisodes([1, 2]));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('API error');
  });

  it('resets episodes when ids becomes empty', async () => {
    (api.fetchEpisodesByIds as jest.Mock).mockResolvedValue(mockEpisodes);
    const { result, rerender } = renderHook(({ ids }) => useEpisodes(ids), {
      initialProps: { ids: [1] },
    });
    await waitFor(() => expect(result.current.episodes).toHaveLength(1));
    rerender({ ids: [] });
    expect(result.current.episodes).toEqual([]);
  });

  it('calls fetchEpisodesByIds with the correct ids', async () => {
    (api.fetchEpisodesByIds as jest.Mock).mockReturnValue(new Promise(() => {}));
    renderHook(() => useEpisodes([1, 5, 10]));
    expect(api.fetchEpisodesByIds).toHaveBeenCalledWith([1, 5, 10]);
  });
});
