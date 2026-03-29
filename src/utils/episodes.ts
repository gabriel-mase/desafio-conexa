export function extractEpisodeId(url: string): number {
  const segments = url.split('/');
  return parseInt(segments[segments.length - 1], 10);
}

export interface EpisodeSets {
  onlyChar1: number[];
  shared: number[];
  onlyChar2: number[];
}

export function computeEpisodeSets(
  char1Episodes: string[],
  char2Episodes: string[]
): EpisodeSets {
  const set1 = new Set(char1Episodes);
  const set2 = new Set(char2Episodes);

  const onlyChar1 = char1Episodes
    .filter((ep) => !set2.has(ep))
    .map(extractEpisodeId);

  const shared = char1Episodes
    .filter((ep) => set2.has(ep))
    .map(extractEpisodeId);

  const onlyChar2 = char2Episodes
    .filter((ep) => !set1.has(ep))
    .map(extractEpisodeId);

  return { onlyChar1, shared, onlyChar2 };
}
