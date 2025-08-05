// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from '../context/FavoritesContext';
import { SearchProvider } from '../context/SearchContext';

export default function RootLayout() {
  return (
    // SafeAreaProvider needs to be the outermost provider to work correctly.
    <SafeAreaProvider>
      <FavoritesProvider>
        <SearchProvider>
          {/* 'auto' style is generally more flexible. */}
          <StatusBar style="auto" />

          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SearchProvider>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
