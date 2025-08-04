// app/phrases/[category].tsx
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { PHRASES } from '../../../../data/mockData';
import { useFavorites } from '../../../../context/FavoritesContext';
import PhraseCard from '../../../../components/PhraseCard';

export default function PhraseListScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const phrases = PHRASES.filter((p) => p.category === category);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={phrases}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PhraseCard
            phrase={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
        contentContainerStyle={{ paddingTop: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
