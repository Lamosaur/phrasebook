import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import PhraseCard from '../PhraseCard';
import { Phrase } from '../../types';

// Mock the Link component from expo-router
jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

const mockPhrase: Phrase = {
  id: 1,
  category: 'Greetings',
  polish_phrase: 'Cześć',
  vietnamese_phrase: 'Chào bạn',
  phonetic_guide: '',
  audio_filename: '',
};

describe('PhraseCard', () => {
  it('renders the phrase text correctly', () => {
    render(
      <PhraseCard phrase={mockPhrase} isFavorite={false} onToggleFavorite={() => {}} />
    );

    expect(screen.getByText('Cześć')).toBeTruthy();
    expect(screen.getByText('Chào bạn')).toBeTruthy();
  });

  it('calls onToggleFavorite when the star is pressed', () => {
    const handleToggleFavorite = jest.fn();
    render(
      <PhraseCard
        phrase={mockPhrase}
        isFavorite={false}
        onToggleFavorite={handleToggleFavorite}
      />
    );

    const starButton = screen.getByRole('button'); // The star is the second button
    fireEvent.press(starButton);

    expect(handleToggleFavorite).toHaveBeenCalledTimes(1);
  });

  it('displays a filled star when isFavorite is true', () => {
    const { rerender } = render(
      <PhraseCard phrase={mockPhrase} isFavorite={true} onToggleFavorite={() => {}} />
    );
    // The FontAwesome component receives 'star' as a name prop
    const starIcon = screen.getByLabelText('star'); // Using accessibilityLabel on FontAwesome
    expect(starIcon).toBeDefined();

    rerender(
      <PhraseCard phrase={mockPhrase} isFavorite={false} onToggleFavorite={() => {}} />
    );
    const emptyStarIcon = screen.getByLabelText('star-o');
    expect(emptyStarIcon).toBeDefined();
  });
});

// To make the last test work, you need to mock FontAwesome or add accessibilityLabel
// In your PhraseCard.tsx:
/*
<FontAwesome
  name={isFavorite ? 'star' : 'star-o'}
  size={24}
  color={isFavorite ? '#FFD700' : 'gray'}
  accessibilityLabel={isFavorite ? 'star' : 'star-o'} // Add this line
/>
*/