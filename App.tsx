import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { VirtueProvider } from './src/store/VirtueContext';
import HomeScreen from './src/screens/HomeScreen';
import { Colors } from './src/theme';

/**
 * Franklin's 13 Virtues — a daily moral tracking app
 * inspired by Benjamin Franklin's system for self-improvement.
 *
 * Architecture:
 *   App.tsx ← you are here
 *   └── VirtueProvider (state + persistence)
 *       └── HomeScreen
 *           ├── WeekHeader (focus virtue + date range)
 *           ├── VirtueGrid (13×7 tap-to-mark grid)
 *           └── WeekSummary (fault count + encouragement)
 */
export default function App() {
  return (
    <VirtueProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.focus}
        />
        <HomeScreen />
      </SafeAreaView>
    </VirtueProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.focus,
  },
});
