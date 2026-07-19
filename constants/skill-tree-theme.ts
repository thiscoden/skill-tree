/**
 * Central color palette for the skill-tree canvas (WoW talent-tree aesthetic).
 * Tune the violet/gold tones here — nothing else in tree-canvas.tsx / node-glyph.tsx
 * should hardcode a color.
 */
export const SkillTreeColors = {
  background: '#1A1025',
  /** Node title label — fixed, not theme-following: the canvas background never changes with
   * light/dark mode, so text tied to the app theme's text color can end up near-invisible
   * (e.g. light-mode's near-black text on this near-black purple). */
  label: '#F3EDFB',

  edge: {
    inactive: '#4B5563',
    active: '#FACC15',
  },

  node: {
    background: '#150C22',
    locked: {
      border: '#6B7280',
      opacity: 0.5,
    },
    available: {
      border: '#C7CDD6',
      opacity: 1,
    },
    mastered: {
      border: '#FACC15',
      opacity: 1,
      glow: 'rgba(250, 204, 21, 0.55)',
    },
  },
} as const;
