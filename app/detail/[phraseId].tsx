// app/detail/[phraseId].tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { PHRASES } from '../../data/mockData'; // Adjust path

export default function PhraseDetailScreen() {
  const { phraseId } = useLocalSearchParams();
  const phrase = PHRASES.find(p => p.id.toString() === phraseId);

  if (!phrase) {
    return <View><Text>Phrase not found!</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.polish}>{phrase.polish_phrase}</Text>
      <Text style={styles.vietnamese}>{phrase.vietnamese_phrase}</Text>
      <Text style={styles.phonetic}>{phrase.phonetic_guide}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  polish: { fontSize: 32, fontWeight: 'bold', marginVertical: 10 },
  vietnamese: { fontSize: 28, marginVertical: 10 },
  phonetic: { fontSize: 22, color: 'gray', fontStyle: 'italic', marginVertical: 10 },
});
