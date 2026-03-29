'use client';

import { Character } from '@/types';
import { CharacterCard } from '@/components/CharacterCard/CharacterCard';
import { Pagination } from '@/components/Pagination/Pagination';

interface Props {
  slot: 1 | 2;
  characters: Character[];
  selectedCharacter: Character | null;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  onSelect: (character: Character) => void;
  onPageChange: (page: number) => void;
}

export function CharacterGrid({
  slot,
  characters,
  selectedCharacter,
  currentPage,
  totalPages,
  loading,
  onSelect,
  onPageChange,
}: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-white">
          Character{' '}
          <span className="text-green-400">#{slot}</span>
        </h2>
        {selectedCharacter && (
          <div className="flex items-center gap-2 bg-green-400/10 border border-green-400/30 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-medium truncate max-w-[120px]">
              {selectedCharacter.name}
            </span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              isSelected={selectedCharacter?.id === character.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex items-center gap-3 p-2 rounded-xl border-2 border-portal-border bg-portal-card animate-pulse">
      <div className="w-16 h-16 rounded-lg bg-slate-700 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="h-3 bg-slate-700 rounded w-3/4 mb-2" />
        <div className="h-2.5 bg-slate-700 rounded w-1/2" />
      </div>
    </div>
  );
}
