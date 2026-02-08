import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { VirtueProvider } from './src/store/VirtueContext';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import { Colors } from './src/theme';

/**
 * Franklin's 13 Virtues — a daily moral tracking app
 * inspired by Benjamin Franklin's system for self-improvement.
 *
 * Architecture:
 *   App.tsx ← you are here
 *   └── VirtueProvider (state + persistence)
 *       ├── HomeScreen
 *       │   ├── WeekHeader (focus virtue + date range)
 *       │   ├── VirtueGrid (13×7 tap-to-mark grid)
 *       │   └── WeekSummary (fault count + encouragement)
 *       └── HistoryScreen
 *           └── HistoryWeekCard[] (archived week summaries)
 */

type Screen = 'home' | 'history';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  return (
    <SafeAreaProvider>
      <VirtueProvider>
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.focus}
          />
          {screen === 'home' ? (
            <HomeScreen onOpenHistory={() => setScreen('history')} />
          ) : (
            <HistoryScreen onBack={() => setScreen('home')} />
          )}
        </SafeAreaView>
      </VirtueProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.focus,
  },
});