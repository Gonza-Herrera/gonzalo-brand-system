export const GH_THEME_ATTRIBUTE = 'data-gh-theme';
export const GH_THEME_STORAGE_KEY = 'gh-design-system-theme';

export const GH_THEMES = ['light', 'dark'] as const;

export type GhTheme = (typeof GH_THEMES)[number];

export function isGhTheme(value: unknown): value is GhTheme {
  return typeof value === 'string' && GH_THEMES.includes(value as GhTheme);
}
