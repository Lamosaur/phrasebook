// app/(tabs)/(home)/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDebounce } from '../../../hooks/useDebounce';
import { FontAwesome } from '@expo/vector-icons';
import { Phrase, Category, Subcategory } from '../../../types';
import { getCategories, searchPhrases, searchSubcategories } from '../../../services/database';
import PhraseCard from '../../../components/PhraseCard';
import { useFavorites } from '../../../context/FavoritesContext';
import { useSearch } from '../../../context/SearchContext';

export default function CategoriesScreen() {
  const { searchQuery, setSearchQuery } = useSearch(); // Use context instead of local state
  const [filteredPhrases, setFilteredPhrases] = useState<Phrase[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { isFavorite, toggleFavorite } = useFavorites();
  const router = useRouter();

  // Load initial categories
  useEffect(() => {
    const loadData = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    loadData();
  }, []);

  // Handle search logic for both phrases and subcategories
  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchQuery) {
        const [phraseResults, subcategoryResults] = await Promise.all([
          searchPhrases(debouncedSearchQuery),
          searchSubcategories(debouncedSearchQuery),
        ]);
        setFilteredPhrases(phraseResults);
        setFilteredSubcategories(subcategoryResults);
      } else {
        setFilteredPhrases([]);
        setFilteredSubcategories([]);
      }
    };
    performSearch();
  }, [debouncedSearchQuery]);

  const handleCategoryPress = (item: Category) => {
    setSearchQuery(''); // Clear search on navigation
    router.push({
      pathname: '/subcategories/[categoryId]',
      params: { categoryId: String(item.id), categoryName: item.name },
    });
  };

  const handleSubcategoryPress = (item: Subcategory) => {
    setSearchQuery(''); // Clear search on navigation
    router.push({
      pathname: '/phrases/[subcategoryId]',
      params: { subcategoryId: String(item.id), subcategoryName: item.name },
    });
  };

  const renderSearchResultItem = ({ item }: { item: Phrase | Subcategory }) => {
    // Type guard to check if the item is a Phrase
    if ('polish_phrase' in item) {
      return (
        <PhraseCard
          phrase={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={() => toggleFavorite(item.id)}
        />
      );
    }
    // Otherwise, it's a Subcategory
    return (
      <TouchableOpacity style={styles.resultItem} onPress={() => handleSubcategoryPress(item)}>
        <Text style={styles.resultTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const searchResultsSections = [];
  if (filteredSubcategories.length > 0) {
    searchResultsSections.push({ title: 'Category', data: filteredSubcategories });
  }
  if (filteredPhrases.length > 0) {
    searchResultsSections.push({ title: 'Phrases', data: filteredPhrases });
  }

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.searchContainer}>
        {/* Search bar remains the same */}
        <View style={styles.searchWrapper}>
          <FontAwesome name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search categories or phrases..."
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
        <SectionList
          sections={searchResultsSections}
          keyExtractor={(item) => {
            // Prepend a type to the key to guarantee uniqueness across sections
            if ('polish_phrase' in item) {
              return `phrase-${item.id}`;
            }
            return `subcategory-${item.id}`;
          }}
          renderItem={renderSearchResultItem}
          renderSectionHeader={renderSectionHeader}
          ListEmptyComponent={<Text style={styles.noResultsText}>No results found.</Text>}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      ) : (
        <FlatList
          key="category-grid"
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress(item)}>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          contentContainerStyle={styles.categoryGridContainer}
        />
      )}
    </SafeAreaView>
  );
}

// Styles remain the same, with additions
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
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  resultTitle: { fontSize: 18, fontWeight: '500' },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
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
  categoryText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0d47a1',
    textAlign: 'center',
  },
});
