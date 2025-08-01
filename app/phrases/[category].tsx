// app/phrases/[category].tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router'; // useLocalSearchParams gets the URL parameter
import { PHRASES } from '../../data/mockData'; // Adjust path if needed

export default function PhraseListScreen() {
  const { category } = useLocalSearchParams(); // Gets the category name from the URL
  const phrases = PHRASES.filter(p => p.category === category);

  return (
    <View style={styles.container}>
      <FlatList
        data={phrases}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/detail/${item.id}`} asChild>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.title}>{item.polish_phrase}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { backgroundColor: '#aed6f1', padding: 20, marginVertical: 8, borderRadius: 5 },
  title: { fontSize: 18 },
});
