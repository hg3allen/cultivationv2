import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getVirtue } from '../data/virtues';
import { useVirtues } from '../store/VirtueContext';
import { getWeekStart, formatWeekRange } from '../utils/dates';
import { Colors, Spacing, FontSize, Radius } from '../theme';

export default function WeekHeader() {
  const { week } = useVirtues();
  const focusVirtue = getVirtue(week.focusVirtueId);
  const weekStart = getWeekStart(new Date());

  return (
    <View style={styles.container}>
      <Text style={styles.dateRange}>{formatWeekRange(weekStart)}</Text>
      <Text style={styles.label}>This week's focus</Text>
      <Text style={styles.virtueTitle}>{focusVirtue.title}</Text>
      <Text style={styles.precept}>"{focusVirtue.precept}"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.focus,
    borderBottomLeftRadius: Radius.lg,
    borderBottomRightRadius: Radius.lg,
  },
  dateRange: {
    fontSize: FontSize.xs,
    color: Colors.focusLight,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: Spacing.xs,
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.focusLight,
    marginBottom: Spacing.xs,
  },
  virtueTitle: {
    fontSize: FontSize.title,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  precept: {
    fontSize: FontSize.sm,
    color: Colors.focusLight,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
