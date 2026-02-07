import { Virtue } from '../types';

/**
 * Benjamin Franklin's 13 Virtues, in the order he practiced them.
 * Each precept is his original wording from the Autobiography.
 */
const VIRTUES: Virtue[] = [
  { id: 1,  title: 'Temperance',  precept: 'Eat not to dullness; drink not to elevation.' },
  { id: 2,  title: 'Silence',     precept: 'Speak not but what may benefit others or yourself; avoid trifling conversation.' },
  { id: 3,  title: 'Order',       precept: 'Let all your things have their places; let each part of your business have its time.' },
  { id: 4,  title: 'Resolution',  precept: 'Resolve to perform what you ought; perform without fail what you resolve.' },
  { id: 5,  title: 'Frugality',   precept: 'Make no expense but to do good to others or yourself; i.e., waste nothing.' },
  { id: 6,  title: 'Industry',    precept: 'Lose no time; be always employed in something useful; cut off all unnecessary actions.' },
  { id: 7,  title: 'Sincerity',   precept: 'Use no hurtful deceit; think innocently and justly, and, if you speak, speak accordingly.' },
  { id: 8,  title: 'Justice',     precept: 'Wrong none by doing injuries, or omitting the benefits that are your duty.' },
  { id: 9,  title: 'Moderation',  precept: 'Avoid extremes; forbear resenting injuries so much as you think they deserve.' },
  { id: 10, title: 'Cleanliness', precept: 'Tolerate no uncleanliness in body, clothes, or habitation.' },
  { id: 11, title: 'Tranquility', precept: 'Be not disturbed at trifles, or at accidents common or unavoidable.' },
  { id: 12, title: 'Chastity',    precept: 'Rarely use venery but for health or offspring, never to dullness, weakness, or the injury of your own or another\'s peace or reputation.' },
  { id: 13, title: 'Humility',    precept: 'Imitate Jesus and Socrates.' },
];

export default VIRTUES;

/** Get a virtue by its id. */
export function getVirtue(id: number): Virtue {
  return VIRTUES[id - 1];
}

/**
 * Determine which virtue to focus on based on the week number within
 * a 13-week cycle. Week 0 → Temperance, Week 12 → Humility, then repeat.
 */
export function getFocusVirtueId(weekOfYear: number): number {
  return (weekOfYear % 13) + 1;
}
