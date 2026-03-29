import { Episode } from '@/types';

interface Props {
  episode: Episode;
}

export function EpisodeItem({ episode }: Props) {
  return (
    <li className="flex items-start gap-2 py-2 border-b border-slate-700/50 last:border-0 group">
      <span className="flex-shrink-0 text-xs font-mono font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded mt-0.5">
        {episode.episode}
      </span>
      <div className="min-w-0">
        <p className="text-sm text-white font-medium leading-tight truncate group-hover:text-green-400 transition-colors">
          {episode.name}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">{episode.air_date}</p>
      </div>
    </li>
  );
}
