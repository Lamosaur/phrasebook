import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {/* You can add your settings options here */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>App Version</Text>
        <Text style={styles.settingValue}>1.0.0</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Text style={styles.settingValue}>Coming Soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  settingItem: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 18,
  },
  settingValue: {
    fontSize: 18,
    color: 'gray',
  },
});