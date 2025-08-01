// app/phrases/[category].tsx
import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { PHRASES } from '../../data/mockData';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PhraseListScreen() {
  const { category } = useLocalSearchParams();
  const phrases = PHRASES.filter(p => p.category === category);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={phrases}
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
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    // Elevation for Android
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
