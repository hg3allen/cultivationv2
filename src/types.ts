/**
 * Core types for the Franklin Virtues tracker.
 *
 * Franklin's system: focus on one virtue per week, cycle through all 13
 * in a quarter (13 weeks). Each day, mark whether you upheld each virtue.
 */

export interface Virtue {
  id: number;
  title: string;
  precept: string;
}

/** One day's marks across all 13 virtues. true = fault committed. */
export type DayMarks = Record<number, boolean>;

/**
 * A single week of tracking.
 * `focusVirtueId` is the virtue being specially attended to that week.
 * `days` maps day index (0=Sun … 6=Sat) to that day's fault marks.
 */
export interface Week {
  id: string;            // ISO date string of the week's Sunday
  focusVirtueId: number;
  days: Record<number, DayMarks>;
}

/** The shape of persisted app state. */
export interface AppState {
  currentWeek: Week;
  history: Week[];
}
