'use client';

import Image from 'next/image';
import { Character } from '@/types';

interface Props {
  character: Character;
  isSelected: boolean;
  onSelect: (character: Character) => void;
}

const STATUS_STYLES: Record<Character['status'], string> = {
  Alive: 'bg-green-400',
  Dead: 'bg-red-500',
  unknown: 'bg-gray-500',
};

export function CharacterCard({ character, isSelected, onSelect }: Props) {
  return (
    <button
      onClick={() => onSelect(character)}
      aria-pressed={isSelected}
      aria-label={`Select ${character.name}`}
      className={`
        flex items-center gap-3 p-2 rounded-xl w-full text-left
        border-2 transition-all duration-200 cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400
        ${
          isSelected
            ? 'border-green-400 bg-green-400/10 shadow-[0_0_12px_rgba(74,222,128,0.3)]'
            : 'border-portal-border bg-portal-card hover:border-slate-500 hover:bg-slate-700'
        }
      `}
    >
      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          fill
          sizes="64px"
          className="object-cover"
        />
        {isSelected && (
          <div className="absolute inset-0 bg-green-400/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-white text-sm leading-tight truncate">
          {character.name}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_STYLES[character.status]}`}
          />
          <span className="text-slate-400 text-xs truncate">
            {character.status} · {character.species}
          </span>
        </div>
      </div>
    </button>
  );
}
