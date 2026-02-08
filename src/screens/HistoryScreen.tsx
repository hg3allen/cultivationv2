import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useVirtues } from '../store/VirtueContext';
import HistoryWeekCard from '../components/HistoryWeekCard';
import { Colors, Spacing, FontSize, Radius } from '../theme';

interface Props {
  onBack: () => void;
}

export default function HistoryScreen({ onBack }: Props) {
  const { history, clearHistory } = useVirtues();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.6}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Past Weeks</Text>
        <View style={styles.backButton} />
      </View>

      {history.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No history yet</Text>
          <Text style={styles.emptyBody}>
            Completed weeks will appear here automatically.{'\n'}
            Keep tracking — your progress accumulates.
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {history.map((week) => (
              <HistoryWeekCard key={week.id} week={week} />
            ))}
          </ScrollView>

          {history.length > 1 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearHistory}
              activeOpacity={0.6}
            >
              <Text style={styles.clearText}>Clear All History</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parchment,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.focus,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomLeftRadius: Radius.lg,
    borderBottomRightRadius: Radius.lg,
  },
  backButton: {
    width: 64,
  },
  backText: {
    color: Colors.focusLight,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.inkLight,
    marginBottom: Spacing.sm,
  },
  emptyBody: {
    fontSize: FontSize.sm,
    color: Colors.inkFaint,
    textAlign: 'center',
    lineHeight: 20,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  clearButton: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
  },
  clearText: {
    fontSize: FontSize.xs,
    color: Colors.fault,
  },
});