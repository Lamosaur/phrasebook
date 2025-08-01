import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // You can customize the tab bar colors here
        tabBarActiveTintColor: '#1E90FF', // Example color
        headerShown: false, // This is important, as the root stack handles headers
      }}>
      <Tabs.Screen
        // This screen links to app/(tabs)/index.tsx
        name="index"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        // This screen links to app/(tabs)/favorites.tsx
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="star" color={color} />,
        }}
      />
    </Tabs>
  );
}