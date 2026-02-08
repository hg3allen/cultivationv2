import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useVirtues } from '../store/VirtueContext';
import WeekHeader from '../components/WeekHeader';
import VirtueGrid from '../components/VirtueGrid';
import WeekSummary from '../components/WeekSummary';
import { Colors, Spacing, FontSize } from '../theme';

interface Props {
  onOpenHistory: () => void;
}

export default function HomeScreen({ onOpenHistory }: Props) {
  const { loaded, history } = useVirtues();

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
      <TouchableOpacity
        style={styles.historyButton}
        onPress={onOpenHistory}
        activeOpacity={0.6}
      >
        <Text style={styles.historyText}>
          Past Weeks{history.length > 0 ? ` (${history.length})` : ''}
        </Text>
      </TouchableOpacity>
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
  historyButton: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  historyText: {
    fontSize: FontSize.sm,
    color: Colors.focus,
    fontWeight: '600',
  },
});