// app/favorites.tsx
import React from 'react';
import { Text, StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useFavorites } from '../../context/FavoritesContext';
import { PHRASES } from '../../data/mockData';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const favoritePhrases = PHRASES.filter((p) => favorites.includes(p.id));

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favoritePhrases}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/detail/${item.id}`} asChild>
            <TouchableOpacity style={styles.resultItem}>
              <Text style={styles.resultTitle}>{item.polish_phrase}</Text>
              <Text style={styles.resultSubtitle}>{item.vietnamese_phrase}</Text>
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={{ paddingTop: 10 }}
        ListHeaderComponent={<Text style={styles.header}>Favorites</Text>}
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
  resultItem: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  resultSubtitle: {
    fontSize: 16,
    color: 'gray',
    marginTop: 4,
  },
});
