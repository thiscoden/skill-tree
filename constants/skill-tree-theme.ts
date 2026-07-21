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

  /** Header / tab bar chrome — fixed dark "obsidian + silver metal" look, not theme-following
   * (same reasoning as `label` above: this chrome sits directly on the app's purple tree
   * background, so it must stay legible regardless of the light/dark toggle). */
  chrome: {
    background: '#1A1025',
    metalBorder: '#8B95A1',
    metalBorderDim: '#4B5563',
    rune: {
      active: '#4FC3F7',
      glow: 'rgba(79, 195, 247, 0.35)',
    },
    crystal: {
      core: '#B91C1C',
      ring: '#FF4D4D',
      glow: 'rgba(255, 77, 77, 0.3)',
    },
  },
} as const;
