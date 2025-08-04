import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { FavoritesProvider, useFavorites } from '../FavoritesContext';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// A test component to interact with the context
const FavoritesTestComponent = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  return (
    <View>
      <Text testID="favorites-count">{favorites.length}</Text>
      <Text testID="is-favorite-1">{isFavorite(1) ? 'true' : 'false'}</Text>
      <Text testID="is-favorite-2">{isFavorite(2) ? 'true' : 'false'}</Text>
      <TouchableOpacity testID="toggle-1" onPress={() => toggleFavorite(1)} />
      <TouchableOpacity testID="toggle-2" onPress={() => toggleFavorite(2)} />
    </View>
  );
};

describe('FavoritesContext', () => {
  it('should toggle favorites correctly', () => {
    render(
      <FavoritesProvider>
        <FavoritesTestComponent />
      </FavoritesProvider>
    );

    // Initially, no favorites
    expect(screen.getByTestId('favorites-count').children[0]).toBe('0');
    expect(screen.getByTestId('is-favorite-1').children[0]).toBe('false');

    // Add phrase with id 1 to favorites
    fireEvent.press(screen.getByTestId('toggle-1'));

    // Check state after adding
    expect(screen.getByTestId('favorites-count').children[0]).toBe('1');
    expect(screen.getByTestId('is-favorite-1').children[0]).toBe('true');

    // Add phrase with id 2 to favorites
    fireEvent.press(screen.getByTestId('toggle-2'));
    expect(screen.getByTestId('favorites-count').children[0]).toBe('2');
    expect(screen.getByTestId('is-favorite-2').children[0]).toBe('true');

    // Remove phrase with id 1 from favorites
    fireEvent.press(screen.getByTestId('toggle-1'));
    expect(screen.getByTestId('favorites-count').children[0]).toBe('1');
    expect(screen.getByTestId('is-favorite-1').children[0]).toBe('false');
  });
});