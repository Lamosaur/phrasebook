// app/phrases/[category].tsx
import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { PHRASES } from '../../../../data/mockData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useFavorites } from '../../../../context/FavoritesContext';

export default function PhraseListScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const phrases = PHRASES.filter((p) => p.category === category);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={phrases}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Link href={`/detail/${item.id}`} asChild>
              <TouchableOpacity style={styles.textContainer}>
                <Text style={styles.resultTitle}>{item.polish_phrase}</Text>
                <Text style={styles.resultSubtitle}>{item.vietnamese_phrase}</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              onPress={() => (isFavorite(item.id) ? removeFavorite(item.id) : addFavorite(item.id))}
              style={styles.starButton}
            >
              <FontAwesome
                name={isFavorite(item.id) ? 'star' : 'star-o'}
                size={24}
                color={isFavorite(item.id) ? '#FFD700' : 'gray'}
              />
            </TouchableOpacity>
          </View>
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
  resultItem: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    // Elevation for Android
    elevation: 2,
  },
  textContainer: {
    flex: 1,
  },
  starButton: {
    paddingLeft: 15,
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
