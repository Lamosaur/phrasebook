import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF', // Example active color
        tabBarInactiveTintColor: 'gray', // Example inactive color
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          headerShown: false, // The home tab uses its own stack navigator for headers
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Yêu Thích', // This sets the header title
          headerShown: true,   // This ensures the header is visible
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{ 
          title: 'Cài Đặt', // This sets the header title
          headerShown: true,   // This ensures the header is visible
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}