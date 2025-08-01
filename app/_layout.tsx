// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // <-- Import SafeAreaProvider

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* 
        This is the key fix. It tells the OS to manage the status bar.
        'auto' will automatically set the text color (light/dark) based on the system theme.
      */}
      <StatusBar style="dark" translucent={false} />

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="phrases/[category]"
          options={({ route }) => ({
            title: route.params.category,
            headerBackTitleVisible: false,
          })}
        />
        <Stack.Screen
          name="detail/[phraseId]"
          options={{
            title: 'Phrase Detail',
            headerBackTitleVisible: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
