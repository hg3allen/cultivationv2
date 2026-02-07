import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useVirtues } from '../store/VirtueContext';
import WeekHeader from '../components/WeekHeader';
import VirtueGrid from '../components/VirtueGrid';
import WeekSummary from '../components/WeekSummary';
import { Colors } from '../theme';

export default function HomeScreen() {
  const { loaded } = useVirtues();

  if (!loaded) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color={Colors.focus} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WeekHeader />
      <VirtueGrid />
      <WeekSummary />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parchment,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
