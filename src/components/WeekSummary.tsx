import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import VIRTUES from '../data/virtues';
import { useVirtues } from '../store/VirtueContext';
import { Colors, Spacing, FontSize, Radius } from '../theme';

/**
 * Simple summary: total faults this week and an encouraging message.
 */
export default function WeekSummary() {
  const { countFaults } = useVirtues();

  const totalFaults = VIRTUES.reduce(
    (sum, v) => sum + countFaults(v.id),
    0,
  );

  const maxPossible = 13 * 7; // 91
  const clean = maxPossible - totalFaults;

  const message =
    totalFaults === 0
      ? 'A clean slate. Stay vigilant.'
      : totalFaults <= 5
        ? 'Few faults — steady progress.'
        : totalFaults <= 15
          ? 'Room to improve. Keep at it.'
          : 'Awareness is the first step.';

  return (
    <View style={styles.container}>
      <View style={styles.statRow}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{clean}</Text>
          <Text style={styles.statLabel}>clean</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={[styles.statNumber, totalFaults > 0 && styles.faultNumber]}>
            {totalFaults}
          </Text>
          <Text style={styles.statLabel}>faults</Text>
        </View>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.cream,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  stat: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  statNumber: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.success,
  },
  faultNumber: {
    color: Colors.fault,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.inkFaint,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border,
  },
  message: {
    fontSize: FontSize.sm,
    color: Colors.inkLight,
    fontStyle: 'italic',
  },
});
