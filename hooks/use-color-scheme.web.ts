/**
 * Web build is dark-only — no light-mode white background, no system-preference toggle.
 * Matches the gothic obsidian chrome (header/tab bar), which never changed with the toggle
 * anyway; this just makes the rest of the app (list/card backgrounds) consistent with it.
 */
export function useColorScheme(): 'dark' {
  return 'dark';
}
