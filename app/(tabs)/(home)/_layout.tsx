import { Stack } from 'expo-router';
import React from 'react';

export default function HomeStackLayout() {
  // This stack navigator handles the navigation for the "home" tab.
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="subcategories/[categoryId]"
        options={({ route }) => {
          // Safely cast and access the route parameters
          const params = route.params as { categoryName?: string };
          return {
            title: params?.categoryName ?? 'Subcategories',
          };
        }}
      />
      <Stack.Screen
        name="phrases/[subcategoryId]"
        options={({ route }) => {
          // Safely cast and access the route parameters
          const params = route.params as { subcategoryName?: string };
          return {
            title: params?.subcategoryName ?? 'Phrases',
          };
        }}
      />
      <Stack.Screen name="detail/[phraseId]" options={{ title: 'Cụm Từ Hiển Thị' }} />
    </Stack>
  );
}