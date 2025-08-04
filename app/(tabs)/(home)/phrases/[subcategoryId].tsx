// app/(tabs)/(home)/phrases/[subcategoryId].tsx
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useFavorites } from '../../../../context/FavoritesContext';
import PhraseCard from '../../../../components/PhraseCard';
import { getPhrasesForSubcategory } from '../../../../services/database';
import { Phrase } from '../../../../types';

export default function PhraseListScreen() {
  const { subcategoryId, subcategoryName } = useLocalSearchParams<{ subcategoryId: string, subcategoryName: string }>();
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigation = useNavigation();

  useEffect(() => {
    if (subcategoryName) {
      navigation.setOptions({ title: subcategoryName });
    }
  }, [subcategoryName, navigation]);

  useEffect(() => {
    console.log(`PHRASES SCREEN: useEffect triggered. The value of subcategoryId is:`, subcategoryId);

    if (subcategoryId) {
      const loadPhrases = async () => {
        const numericSubcategoryId = parseInt(subcategoryId, 10);
        if (!isNaN(numericSubcategoryId)) {
          console.log(`PHRASES SCREEN: Calling database with numeric ID: ${numericSubcategoryId}`);

          const data = await getPhrasesForSubcategory(numericSubcategoryId);
          
          console.log('PHRASES SCREEN: Data received from database:', JSON.stringify(data, null, 2));

          setPhrases(data);
        }
      };
      loadPhrases();
    }
  }, [subcategoryId]);

  const renderPhraseCard = ({ item }: { item: Phrase }) => (
    <PhraseCard
      phrase={item}
      isFavorite={isFavorite(item.id)}
      onToggleFavorite={() => toggleFavorite(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={phrases}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPhraseCard}
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
