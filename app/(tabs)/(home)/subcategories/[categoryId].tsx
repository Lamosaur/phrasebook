import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router'; // Import useRouter
import { getSubcategoriesForCategory } from '../../../../services/database';
import { Subcategory } from '../../../../types';

export default function SubcategoryListScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const router = useRouter(); // Get the router instance

  useEffect(() => {
    if (categoryId) {
      const loadSubcategories = async () => {
        const numericCategoryId = parseInt(categoryId, 10);
        if (!isNaN(numericCategoryId)) {
          const data = await getSubcategoriesForCategory(numericCategoryId);
          setSubcategories(data);
        }
      };
      loadSubcategories();
    }
  }, [categoryId]);

  const handlePress = (item: Subcategory) => {
    console.log(`SUBCATEGORIES SCREEN: Navigating with item: ID=${item.id}, Name=${item.name}`);
    
    router.push({
      pathname: '/phrases/[subcategoryId]',
      // --- THE FIX: Explicitly convert the ID to a string ---
      params: { subcategoryId: item.id, subcategoryName: item.name },
    });
  };

  const renderSubcategoryCard = ({ item }: { item: Subcategory }) => (
    // Use TouchableOpacity with the new handlePress function
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={subcategories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderSubcategoryCard}
      contentContainerStyle={styles.gridContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gridContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
});
