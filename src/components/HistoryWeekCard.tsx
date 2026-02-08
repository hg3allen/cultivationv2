import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Week } from '../types';
import VIRTUES, { getVirtue } from '../data/virtues';
import { useVirtues } from '../store/VirtueContext';
import { formatWeekRange } from '../utils/dates';
import { Colors, Spacing, FontSize, Radius } from '../theme';

interface Props {
  week: Week;
}

const DOT_SIZE = 6;
const CELL_SIZE = 14;

/**
 * Compact card showing a past week's virtue grid and stats.
 * Displays the focus virtue, date range, total faults, and a mini fault grid.
 */
export default function HistoryWeekCard({ week }: Props) {
  const { totalFaultsForWeek, deleteHistoryWeek } = useVirtues();
  const focusVirtue = getVirtue(week.focusVirtueId);
  const weekStart = new Date(week.id + 'T00:00:00');
  const faults = totalFaultsForWeek(week);
  const maxPossible = 13 * 7;
  const clean = maxPossible - faults;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.dateRange}>{formatWeekRange(weekStart)}</Text>
          <View style={styles.focusBadge}>
            <Text style={styles.focusText}>{focusVirtue.title}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.cleanCount}>{clean}</Text>
          <Text style={styles.statLabel}>clean</Text>
          <Text style={styles.faultCount}>{faults}</Text>
          <Text style={styles.statLabel}>faults</Text>
        </View>
      </View>

      {/* Mini grid */}
      <View style={styles.miniGrid}>
        {VIRTUES.map((virtue) => {
          const isFocus = virtue.id === week.focusVirtueId;
          return (
            <View key={virtue.id} style={styles.miniRow}>
              <Text
                style={[styles.miniLabel, isFocus && styles.miniFocusLabel]}
                numberOfLines={1}
              >
                {virtue.title.slice(0, 4)}
              </Text>
              {Array.from({ length: 7 }, (_, day) => {
                const hasFault = !!week.days[day]?.[virtue.id];
                return (
                  <View key={day} style={styles.miniCell}>
                    {hasFault && <View style={styles.miniDot} />}
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>

      {/* Delete */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteHistoryWeek(week.id)}
        activeOpacity={0.6}
      >
        <Text style={styles.deleteText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cream,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  dateRange: {
    fontSize: FontSize.sm,
    color: Colors.inkLight,
    marginBottom: Spacing.xs,
  },
  focusBadge: {
    backgroundColor: Colors.focusLight,
    borderRadius: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  focusText: {
    fontSize: FontSize.xs,
    color: Colors.focus,
    fontWeight: '700',
  },
  cleanCount: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.success,
  },
  faultCount: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.fault,
  },
  statLabel: {
    fontSize: 9,
    color: Colors.inkFaint,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  miniGrid: {
    marginTop: Spacing.xs,
  },
  miniRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  miniLabel: {
    width: 32,
    fontSize: 9,
    color: Colors.inkFaint,
  },
  miniFocusLabel: {
    color: Colors.focus,
    fontWeight: '700',
  },
  miniCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniDot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: Colors.fault,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  deleteText: {
    fontSize: FontSize.xs,
    color: Colors.inkFaint,
  },
});