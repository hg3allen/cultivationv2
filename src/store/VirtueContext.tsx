import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Week, DayMarks } from '../types';
import { getFocusVirtueId } from '../data/virtues';
import { getWeekStart, getWeekOfYear, toDateString } from '../utils/dates';

// ── State ────────────────────────────────────────────────────────────

interface State {
  week: Week;
  history: Week[];
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

/** Check if a week has any fault data worth archiving. */
function weekHasData(week: Week): boolean {
  return Object.values(week.days).some((dayMarks) =>
    Object.values(dayMarks).some(Boolean),
  );
}

// ── Actions ──────────────────────────────────────────────────────────

type Action =
  | { type: 'LOAD'; week: Week; history: Week[] }
  | { type: 'TOGGLE_FAULT'; day: number; virtueId: number }
  | { type: 'DELETE_HISTORY_WEEK'; weekId: string }
  | { type: 'CLEAR_HISTORY' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOAD':
      return { week: action.week, history: action.history, loaded: true };

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

    case 'DELETE_HISTORY_WEEK':
      return {
        ...state,
        history: state.history.filter((w) => w.id !== action.weekId),
      };

    case 'CLEAR_HISTORY':
      return { ...state, history: [] };

    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────────────

interface VirtueContextValue {
  week: Week;
  history: Week[];
  loaded: boolean;
  toggleFault: (day: number, virtueId: number) => void;
  hasFault: (day: number, virtueId: number) => boolean;
  countFaults: (virtueId: number) => number;
  countFaultsForWeek: (week: Week, virtueId: number) => number;
  totalFaultsForWeek: (week: Week) => number;
  deleteHistoryWeek: (weekId: string) => void;
  clearHistory: () => void;
}

const VirtueContext = createContext<VirtueContextValue | null>(null);

const STORAGE_KEY = 'franklin_current_week';
const HISTORY_KEY = 'franklin_history';

export function VirtueProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    week: createEmptyWeek(),
    history: [],
    loaded: false,
  });

  // Load saved data on mount
  useEffect(() => {
    (async () => {
      let history: Week[] = [];
      try {
        const histRaw = await AsyncStorage.getItem(HISTORY_KEY);
        if (histRaw) history = JSON.parse(histRaw);
      } catch {
        // Corrupted history — start with empty
      }

      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved: Week = JSON.parse(raw);
          const expected = createEmptyWeek();

          if (saved.id === expected.id) {
            // Same week — restore it
            dispatch({ type: 'LOAD', week: saved, history });
            return;
          }

          // Different week — archive the old one if it has data
          if (weekHasData(saved)) {
            const alreadyArchived = history.some((w) => w.id === saved.id);
            if (!alreadyArchived) {
              history = [saved, ...history];
            }
          }
        }
      } catch {
        // Corrupted data — start fresh
      }

      dispatch({ type: 'LOAD', week: createEmptyWeek(), history });
    })();
  }, []);

  // Persist current week on every change
  useEffect(() => {
    if (state.loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.week));
    }
  }, [state.week, state.loaded]);

  // Persist history on every change
  useEffect(() => {
    if (state.loaded) {
      AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(state.history));
    }
  }, [state.history, state.loaded]);

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

  const countFaultsForWeek = useCallback(
    (_week: Week, virtueId: number) => {
      let count = 0;
      for (let d = 0; d < 7; d++) {
        if (_week.days[d]?.[virtueId]) count++;
      }
      return count;
    },
    [],
  );

  const totalFaultsForWeek = useCallback(
    (_week: Week) => {
      let count = 0;
      for (let d = 0; d < 7; d++) {
        const dayMarks = _week.days[d];
        if (dayMarks) {
          for (const v of Object.values(dayMarks)) {
            if (v) count++;
          }
        }
      }
      return count;
    },
    [],
  );

  const deleteHistoryWeek = useCallback((weekId: string) => {
    dispatch({ type: 'DELETE_HISTORY_WEEK', weekId });
  }, []);

  const clearHistory = useCallback(() => {
    dispatch({ type: 'CLEAR_HISTORY' });
  }, []);

  return (
    <VirtueContext.Provider
      value={{
        week: state.week,
        history: state.history,
        loaded: state.loaded,
        toggleFault,
        hasFault,
        countFaults,
        countFaultsForWeek,
        totalFaultsForWeek,
        deleteHistoryWeek,
        clearHistory,
      }}
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