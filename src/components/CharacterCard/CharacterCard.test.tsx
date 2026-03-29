import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard } from './CharacterCard';
import { Character } from '@/types';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: '',
  created: '',
};

describe('CharacterCard', () => {
  it('renders the character name', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isSelected={false}
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('renders status and species', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isSelected={false}
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByText(/Alive/)).toBeInTheDocument();
    expect(screen.getByText(/Human/)).toBeInTheDocument();
  });

  it('calls onSelect with the character when clicked', () => {
    const onSelect = jest.fn();
    render(
      <CharacterCard
        character={mockCharacter}
        isSelected={false}
        onSelect={onSelect}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith(mockCharacter);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('has aria-pressed=true when selected', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isSelected={true}
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('has aria-pressed=false when not selected', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isSelected={false}
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders dead status correctly', () => {
    render(
      <CharacterCard
        character={{ ...mockCharacter, status: 'Dead' }}
        isSelected={false}
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByText(/Dead/)).toBeInTheDocument();
  });
});
