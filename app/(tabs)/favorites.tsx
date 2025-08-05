// app/favorites.tsx
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '../../context/FavoritesContext';
import PhraseCard from '../../components/PhraseCard';
import { getPhrasesByIds } from '../../services/database';
import { Phrase } from '../../types';
import { useIsFocused } from '@react-navigation/native';

export default function FavoritesScreen() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [favoritePhrases, setFavoritePhrases] = useState<Phrase[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadFavorites = async () => {
      if (isFocused && favorites.length > 0) {
        const phrases = await getPhrasesByIds(favorites);
        setFavoritePhrases(phrases);
      } else {
        setFavoritePhrases([]);
      }
    };
    loadFavorites();
  }, [favorites, isFocused]);

  return (
    <FlatList
      style={styles.container}
      data={favoritePhrases}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PhraseCard
          phrase={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={() => toggleFavorite(item.id)}
        />
      )}
      // Add paddingBottom to create space for the tab bar.
      contentContainerStyle={{ paddingBottom: 80 }}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your favorite phrases will appear here.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});
