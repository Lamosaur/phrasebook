// app/detail/[phraseId].tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getPhraseById } from '../../../../services/database';
import { Phrase } from '../../../../types';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PhraseDetailScreen() {
  const { phraseId } = useLocalSearchParams<{ phraseId: string }>();
  const [phrase, setPhrase] = useState<Phrase | null>(null);

  useEffect(() => {
    if (phraseId) {
      const loadPhrase = async () => {
        const numericPhraseId = parseInt(phraseId, 10);
        const data = await getPhraseById(numericPhraseId);
        setPhrase(data);
      };
      loadPhrase();
    }
  }, [phraseId]);

  if (!phrase) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Tiếng Ba Lan</Text>
        <Text style={styles.phraseText}>{phrase.polish_phrase}</Text>
        <Text style={styles.title}>Tiếng Việt</Text>
        <Text style={styles.phraseText}>{phrase.vietnamese_phrase}</Text>
        <Text style={styles.title}>Cách Phát Âm</Text>
        <Text style={styles.phraseText}>{phrase.phonetic_guide}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  phraseText: {
    fontSize: 18,
  },
});
