import { render, screen } from '@testing-library/react';
import { EpisodePanel } from './EpisodePanel';
import { Episode } from '@/types';

const makeEpisode = (id: number): Episode => ({
  id,
  name: `Episode ${id}`,
  air_date: 'January 1, 2020',
  episode: `S01E0${id}`,
  characters: [],
  url: '',
  created: '',
});

describe('EpisodePanel', () => {
  const baseProps = {
    title: 'Character #1',
    episodes: [],
    loading: false,
    isLocked: false,
    lockMessage: 'Select a character',
  };

  it('renders the panel title', () => {
    render(<EpisodePanel {...baseProps} />);
    expect(screen.getByText('Character #1')).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    render(<EpisodePanel {...baseProps} subtitle="Only Episodes" />);
    expect(screen.getByText('Only Episodes')).toBeInTheDocument();
  });

  it('shows lock message when isLocked is true', () => {
    render(
      <EpisodePanel {...baseProps} isLocked={true} lockMessage="Select Character #1" />
    );
    expect(screen.getByText('Select Character #1')).toBeInTheDocument();
  });

  it('shows loading state when loading is true and not locked', () => {
    render(<EpisodePanel {...baseProps} loading={true} />);
    // Episode count badge should NOT be shown when loading
    expect(screen.queryByText('0')).not.toBeInTheDocument();
    // Neither empty state nor lock message should appear
    expect(screen.queryByText('No episodes found')).not.toBeInTheDocument();
    expect(screen.queryByText('Select a character')).not.toBeInTheDocument();
  });

  it('renders episodes when not locked and not loading', () => {
    const episodes = [makeEpisode(1), makeEpisode(2)];
    render(<EpisodePanel {...baseProps} episodes={episodes} />);
    expect(screen.getByText('Episode 1')).toBeInTheDocument();
    expect(screen.getByText('Episode 2')).toBeInTheDocument();
  });

  it('shows episode count badge when not locked and not loading', () => {
    const episodes = [makeEpisode(1), makeEpisode(2), makeEpisode(3)];
    render(<EpisodePanel {...baseProps} episodes={episodes} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows empty state when no episodes and not locked', () => {
    render(<EpisodePanel {...baseProps} episodes={[]} />);
    expect(screen.getByText('No episodes found')).toBeInTheDocument();
  });

  it('does not render episodes when locked', () => {
    const episodes = [makeEpisode(1)];
    render(
      <EpisodePanel {...baseProps} episodes={episodes} isLocked={true} />
    );
    expect(screen.queryByText('Episode 1')).not.toBeInTheDocument();
  });
});
