import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import VIRTUES from '../data/virtues';
import { useVirtues } from '../store/VirtueContext';
import { DAY_LABELS, getTodayIndex } from '../utils/dates';
import FaultDot from './FaultDot';
import { Colors, Spacing, FontSize } from '../theme';

const LABEL_WIDTH = 80;
const CELL_SIZE = 36;

/**
 * The Franklin Virtue Grid.
 *
 * Rows = 13 virtues (in order).
 * Columns = 7 days (Sun–Sat).
 * Tap a cell to mark a fault (you failed to uphold that virtue that day).
 * The goal: keep the grid as clean as possible.
 */
export default function VirtueGrid() {
  const { week, toggleFault, hasFault } = useVirtues();
  const todayIndex = getTodayIndex();

  return (
    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Column headers: day labels */}
        <View style={styles.headerRow}>
          <View style={{ width: LABEL_WIDTH }} />
          {DAY_LABELS.map((label, i) => (
            <View
              key={i}
              style={[styles.dayHeader, i === todayIndex && styles.todayHeader]}
            >
              <Text
                style={[
                  styles.dayLabel,
                  i === todayIndex && styles.todayLabel,
                ]}
              >
                {label}
              </Text>
            </View>
          ))}
        </View>

        {/* One row per virtue */}
        {VIRTUES.map((virtue) => {
          const isFocus = virtue.id === week.focusVirtueId;

          return (
            <View key={virtue.id} style={styles.row}>
              {/* Virtue label */}
              <View style={[styles.label, isFocus && styles.focusLabel]}>
                <Text
                  style={[styles.labelText, isFocus && styles.focusLabelText]}
                  numberOfLines={1}
                >
                  {virtue.title}
                </Text>
              </View>

              {/* 7 day cells */}
              {Array.from({ length: 7 }, (_, day) => (
                <FaultDot
                  key={day}
                  active={hasFault(day, virtue.id)}
                  isToday={day === todayIndex}
                  onPress={() => toggleFault(day, virtue.id)}
                />
              ))}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  dayHeader: {
    width: CELL_SIZE,
    alignItems: 'center',
    paddingBottom: Spacing.xs,
  },
  todayHeader: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.focus,
  },
  dayLabel: {
    fontSize: FontSize.xs,
    color: Colors.inkFaint,
    fontWeight: '600',
  },
  todayLabel: {
    color: Colors.focus,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: LABEL_WIDTH,
    paddingRight: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  focusLabel: {
    backgroundColor: Colors.focusLight,
    borderRadius: 4,
    paddingLeft: Spacing.xs,
  },
  labelText: {
    fontSize: FontSize.sm,
    color: Colors.inkLight,
  },
  focusLabelText: {
    color: Colors.focus,
    fontWeight: '700',
  },
});
