import { Stack } from 'expo-router';
import React from 'react';

export default function HomeStackLayout() {
  // This stack navigator handles the navigation for the "home" tab.
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="phrases/[category]" options={({ route }) => ({ title: route.params?.category as string })} />
      <Stack.Screen name="detail/[phraseId]" options={{ title: 'Phrase Detail' }} />
    </Stack>
  );
}