import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Week, DayMarks } from '../types';
import { getFocusVirtueId } from '../data/virtues';
import { getWeekStart, getWeekOfYear, toDateString } from '../utils/dates';

// ── State ────────────────────────────────────────────────────────────

interface State {
  week: Week;
  loaded: boolean;
}

function createEmptyWeek(): Week {
  const now = new Date();
  const weekStart = getWeekStart(now);
  return {
    id: toDateString(weekStart),
    focusVirtueId: getFocusVirtueId(getWeekOfYear(now)),
    days: {},
  };
}

// ── Actions ──────────────────────────────────────────────────────────

type Action =
  | { type: 'LOAD'; week: Week }
  | { type: 'TOGGLE_FAULT'; day: number; virtueId: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOAD':
      return { week: action.week, loaded: true };

    case 'TOGGLE_FAULT': {
      const { day, virtueId } = action;
      const dayMarks: DayMarks = { ...state.week.days[day] };
      dayMarks[virtueId] = !dayMarks[virtueId];

      return {
        ...state,
        week: {
          ...state.week,
          days: { ...state.week.days, [day]: dayMarks },
        },
      };
    }

    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────────────

interface VirtueContextValue {
  week: Week;
  loaded: boolean;
  toggleFault: (day: number, virtueId: number) => void;
  hasFault: (day: number, virtueId: number) => boolean;
  countFaults: (virtueId: number) => number;
}

const VirtueContext = createContext<VirtueContextValue | null>(null);

const STORAGE_KEY = 'franklin_current_week';

export function VirtueProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    week: createEmptyWeek(),
    loaded: false,
  });

  // Load saved data on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved: Week = JSON.parse(raw);
          const expected = createEmptyWeek();

          // If saved week matches current week, restore it.
          // Otherwise start fresh (new week).
          if (saved.id === expected.id) {
            dispatch({ type: 'LOAD', week: saved });
            return;
          }
        }
      } catch {
        // Corrupted data — start fresh
      }
      dispatch({ type: 'LOAD', week: createEmptyWeek() });
    })();
  }, []);

  // Persist on every change (after initial load)
  useEffect(() => {
    if (state.loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.week));
    }
  }, [state.week, state.loaded]);

  const toggleFault = useCallback((day: number, virtueId: number) => {
    dispatch({ type: 'TOGGLE_FAULT', day, virtueId });
  }, []);

  const hasFault = useCallback(
    (day: number, virtueId: number) => {
      return !!state.week.days[day]?.[virtueId];
    },
    [state.week.days],
  );

  const countFaults = useCallback(
    (virtueId: number) => {
      let count = 0;
      for (let d = 0; d < 7; d++) {
        if (state.week.days[d]?.[virtueId]) count++;
      }
      return count;
    },
    [state.week.days],
  );

  return (
    <VirtueContext.Provider
      value={{ week: state.week, loaded: state.loaded, toggleFault, hasFault, countFaults }}
    >
      {children}
    </VirtueContext.Provider>
  );
}

export function useVirtues(): VirtueContextValue {
  const ctx = useContext(VirtueContext);
  if (!ctx) throw new Error('useVirtues must be used within VirtueProvider');
  return ctx;
}
