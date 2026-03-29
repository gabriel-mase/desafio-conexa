import { render, screen } from '@testing-library/react';
import { EpisodeItem } from './EpisodeItem';
import { Episode } from '@/types';

const mockEpisode: Episode = {
  id: 1,
  name: 'Pilot',
  air_date: 'December 2, 2013',
  episode: 'S01E01',
  characters: [],
  url: 'https://rickandmortyapi.com/api/episode/1',
  created: '',
};

describe('EpisodeItem', () => {
  it('renders the episode code', () => {
    render(<EpisodeItem episode={mockEpisode} />);
    expect(screen.getByText('S01E01')).toBeInTheDocument();
  });

  it('renders the episode name', () => {
    render(<EpisodeItem episode={mockEpisode} />);
    expect(screen.getByText('Pilot')).toBeInTheDocument();
  });

  it('renders the air date', () => {
    render(<EpisodeItem episode={mockEpisode} />);
    expect(screen.getByText('December 2, 2013')).toBeInTheDocument();
  });

  it('renders as a list item', () => {
    render(
      <ul>
        <EpisodeItem episode={mockEpisode} />
      </ul>
    );
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });
});
