'use client';

import { Episode } from '@/types';
import { EpisodeItem } from '@/components/EpisodeItem/EpisodeItem';

interface Props {
  title: string;
  subtitle?: string;
  episodes: Episode[];
  loading: boolean;
  isLocked: boolean;
  lockMessage: string;
  accentColor?: 'green' | 'teal' | 'blue';
}

const ACCENT_MAP = {
  green: {
    border: 'border-green-500/40',
    header: 'bg-green-500/10 border-b border-green-500/20',
    title: 'text-green-400',
    badge: 'bg-green-500/20 text-green-400',
    lock: 'text-green-400/40',
  },
  teal: {
    border: 'border-teal-500/40',
    header: 'bg-teal-500/10 border-b border-teal-500/20',
    title: 'text-teal-400',
    badge: 'bg-teal-500/20 text-teal-400',
    lock: 'text-teal-400/40',
  },
  blue: {
    border: 'border-blue-500/40',
    header: 'bg-blue-500/10 border-b border-blue-500/20',
    title: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-400',
    lock: 'text-blue-400/40',
  },
};

export function EpisodePanel({
  title,
  subtitle,
  episodes,
  loading,
  isLocked,
  lockMessage,
  accentColor = 'green',
}: Props) {
  const accent = ACCENT_MAP[accentColor];

  return (
    <div
      className={`flex flex-col rounded-xl border ${accent.border} bg-portal-card overflow-hidden`}
    >
      <div className={`px-4 py-3 ${accent.header}`}>
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className={`text-sm font-bold ${accent.title}`}>{title}</h3>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {!isLocked && !loading && (
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${accent.badge}`}
            >
              {episodes.length}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2" style={{ maxHeight: '280px' }}>
        {isLocked ? (
          <LockedState message={lockMessage} color={accent.lock} />
        ) : loading ? (
          <LoadingState />
        ) : episodes.length === 0 ? (
          <EmptyState />
        ) : (
          <ul>
            {episodes.map((ep) => (
              <EpisodeItem key={ep.id} episode={ep} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function LockedState({ message, color }: { message: string; color: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-32 gap-3">
      <svg
        className={`w-8 h-8 ${color}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
      <p className="text-xs text-slate-500 text-center leading-relaxed">{message}</p>
    </div>
  );
}

function LoadingState() {
  return (
    <ul className="space-y-2 pt-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="flex gap-2 animate-pulse">
          <div className="h-5 w-10 bg-slate-700 rounded flex-shrink-0" />
          <div className="flex-1">
            <div className="h-3 bg-slate-700 rounded w-3/4 mb-1.5" />
            <div className="h-2.5 bg-slate-700 rounded w-1/3" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-32 gap-2">
      <svg
        className="w-8 h-8 text-slate-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-xs text-slate-600">No episodes found</p>
    </div>
  );
}
