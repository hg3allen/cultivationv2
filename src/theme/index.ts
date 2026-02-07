/**
 * Design tokens for the Franklin Virtues app.
 *
 * Aesthetic: Warm parchment tones with ink-like accents.
 * Think of Franklin's original handwritten virtue chart.
 */

export const Colors = {
  // Backgrounds
  parchment:    '#F5F0E8',
  parchmentDim: '#EDE7DA',
  cream:        '#FDFBF7',

  // Text
  ink:          '#2C2416',
  inkLight:     '#6B5D4D',
  inkFaint:     '#A89882',

  // Accents
  fault:        '#C0392B',   // Red dot for a fault mark
  faultLight:   '#F5D6D3',
  focus:        '#1A5276',   // Deep blue for the week's focus virtue
  focusLight:   '#D4E6F1',
  success:      '#1E8449',
  successLight: '#D5F5E3',

  // Structure
  border:       '#D5CBBB',
  borderLight:  '#E8E0D2',
  white:        '#FFFFFF',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const FontSize = {
  xs:    11,
  sm:    13,
  base:  15,
  lg:    18,
  xl:    22,
  title: 28,
} as const;

export const Radius = {
  sm: 4,
  md: 8,
  lg: 12,
} as const;
