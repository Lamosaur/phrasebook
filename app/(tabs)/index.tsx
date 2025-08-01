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

  const renderSearchResultItem = ({ item }: { item: Phrase }) => (
    <Link href={`/detail/${item.id}`} asChild>
      <TouchableOpacity style={styles.resultItem}>
        <Text style={styles.resultTitle}>{item.polish_phrase}</Text>
        <Text style={styles.resultSubtitle}>{item.vietnamese_phrase}</Text>
      </TouchableOpacity>
    </Link>
  );

  const renderCategoryCard = ({ item }: { item: string }) => (
    <Link href={`/phrases/${item}`} asChild>
      <TouchableOpacity style={styles.categoryCard}>
        <Text style={styles.categoryCardTitle}>{item}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <FontAwesome name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search Polish or Vietnamese..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#888"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={handleClearSearch} style={styles.clearIcon}>
              <FontAwesome name="times-circle" size={20} color="#888" />
            </Pressable>
          )}
        </View>
      </View>

      {searchQuery.length > 0 ? (
        <FlatList
          // --- THE FIX: A unique key for the search list ---
          key="search-results-list"
          data={filteredPhrases}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderSearchResultItem}
          ListEmptyComponent={<Text style={styles.noResultsText}>No phrases found.</Text>}
        />
      ) : (
        <FlatList
          // --- THE FIX: A DIFFERENT unique key for the category grid ---
          key="category-grid"
          data={CATEGORIES}
          keyExtractor={(item) => item}
          renderItem={renderCategoryCard}
          numColumns={2}
          contentContainerStyle={styles.categoryGridContainer}
        />
      )}
    </SafeAreaView>
  );
}

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    color: '#333',
  },
  clearIcon: {
    marginLeft: 10,
  },
  resultItem: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  resultTitle: { fontSize: 18, fontWeight: '500' },
  resultSubtitle: { fontSize: 16, color: 'gray', marginTop: 4 },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
  categoryGridContainer: {
    paddingHorizontal: 5,
  },
  categoryCard: {
    flex: 1,
    margin: 5,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbdefb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0d47a1',
    textAlign: 'center',
  },
});
