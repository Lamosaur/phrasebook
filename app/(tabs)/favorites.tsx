// app/favorites.tsx
import React, { useMemo } from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '../../context/FavoritesContext';
import { PHRASES } from '../../data/mockData';
import PhraseCard from '../../components/PhraseCard';

export default function FavoritesScreen() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const favoritePhrases = useMemo(
    () => PHRASES.filter((p) => favorites.includes(p.id)),
    [favorites]
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favoritePhrases}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PhraseCard
            phrase={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
        contentContainerStyle={{ paddingTop: 10 }}
        ListHeaderComponent={<Text style={styles.header}>Yêu Thích</Text>}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your favorite phrases will appear here.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
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
