// app/(tabs)/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { CATEGORIES, PHRASES } from '../../data/mockData';
import { useDebounce } from '../../hooks/useDebounce';
import { FontAwesome } from '@expo/vector-icons';

type Phrase = {
  id: number;
  category: string;
  polish_phrase: string;
  vietnamese_phrase: string;
  phonetic_guide: string;
  audio_filename: string;
};

export default function CategoriesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPhrases, setFilteredPhrases] = useState<Phrase[]>([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (debouncedSearchQuery) {
      const lowercasedQuery = debouncedSearchQuery.toLowerCase();
      const results = PHRASES.filter(phrase =>
        phrase.polish_phrase.toLowerCase().includes(lowercasedQuery) ||
        phrase.vietnamese_phrase.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredPhrases(results);
    } else {
      setFilteredPhrases([]);
    }
  }, [debouncedSearchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    // SafeAreaView will now work correctly because the StatusBar is visible
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Polish or Vietnamese..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={handleClearSearch} style={styles.clearIcon}>
            <FontAwesome name="times-circle" size={24} color="#888" />
          </Pressable>
        )}
      </View>

      {searchQuery.length > 0 ? (
        <FlatList
          data={filteredPhrases}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={`/detail/${item.id}`} asChild>
              <TouchableOpacity style={styles.resultItem}>
                <Text style={styles.resultTitle}>{item.polish_phrase}</Text>
                <Text style={styles.resultSubtitle}>{item.vietnamese_phrase}</Text>
              </TouchableOpacity>
            </Link>
          )}
          ListEmptyComponent={<Text style={styles.noResultsText}>No phrases found.</Text>}
        />
      ) : (
        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Link href={`/phrases/${item}`} asChild>
              <TouchableOpacity style={styles.categoryItem}>
                <Text style={styles.categoryTitle}>{item}</Text>
              </TouchableOpacity>
            </Link>
          )}
        />
      )}
    </SafeAreaView>
  );
}

// These styles are the same as before, but will now render correctly.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10, // Added a little top margin for spacing
  },
  searchBar: {
    flex: 1,
    height: 50,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingRight: 40,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
  clearIcon: {
    position: 'absolute',
    right: 15,
    height: '100%',
    justifyContent: 'center',
  },
  categoryItem: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  categoryTitle: { fontSize: 24 },
  resultItem: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  resultTitle: { fontSize: 18, fontWeight: '500' },
  resultSubtitle: { fontSize: 16, color: 'gray', marginTop: 4 },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
});
