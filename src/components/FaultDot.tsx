import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../theme';

interface Props {
  active: boolean;
  isToday: boolean;
  onPress: () => void;
}

/**
 * A single cell in the Franklin grid.
 * Tap to mark a fault (red dot). Tap again to clear.
 * Franklin marked faults with a black dot — we use red for clarity.
 */
export default function FaultDot({ active, isToday, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.cell, isToday && styles.todayCell]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      {active && <View style={styles.dot} />}
    </TouchableOpacity>
  );
}

const CELL_SIZE = 36;

const styles = StyleSheet.create({
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  todayCell: {
    backgroundColor: Colors.parchmentDim,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.fault,
  },
});
