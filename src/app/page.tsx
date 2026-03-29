'use client';

import { useState, useMemo } from 'react';
import { Character } from '@/types';
import { useCharacters } from '@/hooks/useCharacters';
import { useEpisodes } from '@/hooks/useEpisodes';
import { CharacterGrid } from '@/components/CharacterGrid/CharacterGrid';
import { EpisodePanel } from '@/components/EpisodePanel/EpisodePanel';
import { computeEpisodeSets } from '@/utils/episodes';

export default function Home() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [selectedChar1, setSelectedChar1] = useState<Character | null>(null);
  const [selectedChar2, setSelectedChar2] = useState<Character | null>(null);

  const { data: data1, loading: loading1 } = useCharacters(page1);
  const { data: data2, loading: loading2 } = useCharacters(page2);

  const episodeSets = useMemo(() => {
    if (!selectedChar1 || !selectedChar2) return null;
    return computeEpisodeSets(selectedChar1.episode, selectedChar2.episode);
  }, [selectedChar1, selectedChar2]);

  const { episodes: episodesOnly1, loading: loadingOnly1 } = useEpisodes(
    episodeSets?.onlyChar1 ?? []
  );
  const { episodes: episodesShared, loading: loadingShared } = useEpisodes(
    episodeSets?.shared ?? []
  );
  const { episodes: episodesOnly2, loading: loadingOnly2 } = useEpisodes(
    episodeSets?.onlyChar2 ?? []
  );

  const bothSelected = selectedChar1 !== null && selectedChar2 !== null;

  return (
    <main className="min-h-screen bg-portal-dark">
      {/* Header */}
      <header className="border-b border-portal-border bg-portal-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center portal-glow flex-shrink-0">
            <span className="text-black font-black text-xs">R&M</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold text-white leading-tight">
              Rick &amp; Morty Explorer
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              Select one character from each column to compare their episodes
            </p>
          </div>

          {bothSelected && (
            <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-400 bg-portal-card border border-portal-border rounded-lg px-2 py-1.5 min-w-0">
              <span className="text-green-400 font-semibold truncate max-w-[80px] sm:max-w-[140px]">{selectedChar1.name}</span>
              <span className="text-slate-600 flex-shrink-0">vs</span>
              <span className="text-blue-400 font-semibold truncate max-w-[80px] sm:max-w-[140px]">{selectedChar2.name}</span>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Characters Section */}
        <section aria-label="Character selection">
          {/* Mobile: stacked. Desktop: side by side with divider */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-4 items-start">
            {/* Character #1 */}
            <CharacterGrid
              slot={1}
              characters={data1?.results ?? []}
              selectedCharacter={selectedChar1}
              currentPage={page1}
              totalPages={data1?.info.pages ?? 1}
              loading={loading1}
              onSelect={setSelectedChar1}
              onPageChange={setPage1}
            />

            {/* Center Divider — visible only on desktop */}
            <div className="hidden lg:flex flex-col items-center gap-2 pt-10">
              <div
                className="w-10 h-10 rounded-full border-2 border-green-400 bg-portal-dark flex items-center justify-center portal-glow"
                aria-hidden="true"
              >
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="w-px flex-1 bg-gradient-to-b from-green-400/40 to-transparent min-h-[200px]" />
            </div>

            {/* Mobile horizontal divider between the two grids */}
            <div className="lg:hidden flex items-center gap-3">
              <div className="flex-1 h-px bg-portal-border" />
              <div
                className="w-8 h-8 rounded-full border-2 border-green-400 bg-portal-dark flex items-center justify-center portal-glow flex-shrink-0"
                aria-hidden="true"
              >
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="flex-1 h-px bg-portal-border" />
            </div>

            {/* Character #2 */}
            <CharacterGrid
              slot={2}
              characters={data2?.results ?? []}
              selectedCharacter={selectedChar2}
              currentPage={page2}
              totalPages={data2?.info.pages ?? 1}
              loading={loading2}
              onSelect={setSelectedChar2}
              onPageChange={setPage2}
            />
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-portal-border" />

        {/* Episodes Section */}
        <section aria-label="Episodes comparison">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
            Episode Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EpisodePanel
              title="Character #1"
              subtitle="Only Episodes"
              episodes={episodesOnly1}
              loading={loadingOnly1}
              isLocked={!bothSelected}
              lockMessage="Select both characters to see their exclusive episodes"
              accentColor="green"
            />

            <EpisodePanel
              title="Characters #1 & #2"
              subtitle="Shared Episodes"
              episodes={episodesShared}
              loading={loadingShared}
              isLocked={!bothSelected}
              lockMessage="Select both characters to see their shared episodes"
              accentColor="teal"
            />

            <EpisodePanel
              title="Character #2"
              subtitle="Only Episodes"
              episodes={episodesOnly2}
              loading={loadingOnly2}
              isLocked={!bothSelected}
              lockMessage="Select both characters to see their exclusive episodes"
              accentColor="blue"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
