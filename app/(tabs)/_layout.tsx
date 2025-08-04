import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1E90FF',
        headerShown: false, // Headers are now handled by the inner Stack
      }}>
      <Tabs.Screen
        // This name points to the (home) directory group
        name="(home)"
        options={{
          title: 'Cụm Từ',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Yêu Thích',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="star" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Cài Đặt',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}