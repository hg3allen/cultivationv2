import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getVirtue } from '../data/virtues';
import { useVirtues } from '../store/VirtueContext';
import { getWeekStart, formatWeekRange } from '../utils/dates';
import { Colors, Spacing, FontSize, Radius } from '../theme';

/**
 * Renders small pips showing position in the 13-week virtue cycle.
 * The active week's pip is highlighted and elongated.
 */
function CyclePips({ activeIndex }: { activeIndex: number }) {
  return (
    <View style={styles.pipsRow}>
      {Array.from({ length: 13 }, (_, i) => (
        <View
          key={i}
          style={[
            styles.pip,
            i < activeIndex && styles.pipPast,
            i === activeIndex && styles.pipActive,
          ]}
        />
      ))}
    </View>
  );
}

export default function WeekHeader() {
  const { week } = useVirtues();
  const focusVirtue = getVirtue(week.focusVirtueId);
  const weekStart = getWeekStart(new Date());
  const cycleIndex = week.focusVirtueId - 1;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.dateRange}>{formatWeekRange(weekStart)}</Text>
        <Text style={styles.weekNum}>Week {cycleIndex + 1} of 13</Text>
      </View>

      <CyclePips activeIndex={cycleIndex} />

      <Text style={styles.label}>This week&#8217;s focus</Text>
      <Text style={styles.virtueTitle}>{focusVirtue.title}</Text>
      <Text style={styles.precept}>&#8220;{focusVirtue.precept}&#8221;</Text>
    </View>
  );
}

const PIP_SIZE = 6;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.focus,
    borderBottomLeftRadius: Radius.lg,
    borderBottomRightRadius: Radius.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  dateRange: {
    fontSize: FontSize.xs,
    color: Colors.focusLight,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  weekNum: {
    fontSize: FontSize.xs,
    color: Colors.focusLight,
    opacity: 0.7,
  },
  pipsRow: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: Spacing.md,
  },
  pip: {
    width: PIP_SIZE,
    height: PIP_SIZE,
    borderRadius: PIP_SIZE / 2,
    backgroundColor: Colors.white,
    opacity: 0.2,
  },
  pipPast: {
    opacity: 0.45,
  },
  pipActive: {
    opacity: 1,
    width: PIP_SIZE * 2.5,
    borderRadius: PIP_SIZE / 2,
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.focusLight,
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: Spacing.xs,
  },
  virtueTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.5,
    marginBottom: Spacing.sm,
  },
  precept: {
    fontSize: FontSize.base,
    color: Colors.focusLight,
    fontStyle: 'italic',
    lineHeight: 22,
  },
});