import { extractEpisodeId, computeEpisodeSets } from './episodes';

describe('extractEpisodeId', () => {
  it('extracts the episode id from a full URL', () => {
    expect(extractEpisodeId('https://rickandmortyapi.com/api/episode/28')).toBe(28);
  });

  it('handles single digit ids', () => {
    expect(extractEpisodeId('https://rickandmortyapi.com/api/episode/1')).toBe(1);
  });

  it('handles triple digit ids', () => {
    expect(extractEpisodeId('https://rickandmortyapi.com/api/episode/100')).toBe(100);
  });
});

describe('computeEpisodeSets', () => {
  const ep = (id: number) => `https://rickandmortyapi.com/api/episode/${id}`;

  it('returns empty sets when both characters have no episodes', () => {
    const result = computeEpisodeSets([], []);
    expect(result.onlyChar1).toEqual([]);
    expect(result.shared).toEqual([]);
    expect(result.onlyChar2).toEqual([]);
  });

  it('puts episodes not in char2 into onlyChar1', () => {
    const char1 = [ep(1), ep(2), ep(3)];
    const char2 = [ep(3), ep(4)];
    const result = computeEpisodeSets(char1, char2);
    expect(result.onlyChar1).toEqual(expect.arrayContaining([1, 2]));
    expect(result.onlyChar1).toHaveLength(2);
  });

  it('puts episodes not in char1 into onlyChar2', () => {
    const char1 = [ep(1), ep(2)];
    const char2 = [ep(2), ep(3), ep(4)];
    const result = computeEpisodeSets(char1, char2);
    expect(result.onlyChar2).toEqual(expect.arrayContaining([3, 4]));
    expect(result.onlyChar2).toHaveLength(2);
  });

  it('correctly identifies shared episodes', () => {
    const char1 = [ep(1), ep(2), ep(3)];
    const char2 = [ep(2), ep(3), ep(5)];
    const result = computeEpisodeSets(char1, char2);
    expect(result.shared).toEqual(expect.arrayContaining([2, 3]));
    expect(result.shared).toHaveLength(2);
  });

  it('handles characters with completely disjoint episodes', () => {
    const char1 = [ep(1), ep(2)];
    const char2 = [ep(3), ep(4)];
    const result = computeEpisodeSets(char1, char2);
    expect(result.onlyChar1).toHaveLength(2);
    expect(result.shared).toHaveLength(0);
    expect(result.onlyChar2).toHaveLength(2);
  });

  it('handles characters with all episodes shared', () => {
    const char1 = [ep(1), ep(2)];
    const char2 = [ep(1), ep(2)];
    const result = computeEpisodeSets(char1, char2);
    expect(result.onlyChar1).toHaveLength(0);
    expect(result.shared).toHaveLength(2);
    expect(result.onlyChar2).toHaveLength(0);
  });

  it('handles char1 with no episodes', () => {
    const char1: string[] = [];
    const char2 = [ep(1), ep(2)];
    const result = computeEpisodeSets(char1, char2);
    expect(result.onlyChar1).toHaveLength(0);
    expect(result.shared).toHaveLength(0);
    expect(result.onlyChar2).toHaveLength(2);
  });
});
