import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Phrase } from '../types';

interface PhraseCardProps {
  phrase: Phrase;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function PhraseCard({ phrase, isFavorite, onToggleFavorite }: PhraseCardProps) {
  return (
    <View style={styles.resultItem}>
      <Link href={`/detail/${phrase.id}`} asChild>
        <TouchableOpacity style={styles.textContainer}>
          <Text style={styles.resultTitle}>{phrase.polish_phrase}</Text>
          <Text style={styles.resultSubtitle}>{phrase.vietnamese_phrase}</Text>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity onPress={onToggleFavorite} style={styles.starButton}>
        <FontAwesome
          name={isFavorite ? 'star' : 'star-o'}
          size={24}
          color={isFavorite ? '#FFD700' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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