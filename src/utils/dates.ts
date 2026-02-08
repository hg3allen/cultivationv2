/**
 * Pure date helpers. No side effects, no state.
 */

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

export { DAY_LABELS };

/** Get ISO date string (YYYY-MM-DD) for a Date. */
export function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

/** Get the Sunday that starts the week containing `date`. */
export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

/** Get the ISO week number (1–53) for a date. */
export function getWeekOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor(diff / oneWeek) + 1;
}

/** Get today's day index (0=Sun … 6=Sat). */
export function getTodayIndex(): number {
  return new Date().getDay();
}

/** Format a date as "Jan 5 – Jan 11" style range for a week. */
export function formatWeekRange(weekStart: Date): string {
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 6);

  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return `${fmt(weekStart)} – ${fmt(end)}`;
}
