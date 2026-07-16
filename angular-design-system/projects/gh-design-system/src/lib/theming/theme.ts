export const GH_THEME_ATTRIBUTE = 'data-theme';
export const GH_THEME_STORAGE_KEY = 'gh-design-system-theme';

export const GH_THEMES = ['light', 'dark'] as const;
export const GH_THEME_PREFERENCES = [...GH_THEMES, 'system'] as const;

export type GhTheme = (typeof GH_THEMES)[number];
export type GhThemePreference = (typeof GH_THEME_PREFERENCES)[number];

export function isGhTheme(value: unknown): value is GhTheme {
  return typeof value === 'string' && GH_THEMES.includes(value as GhTheme);
}

export function isGhThemePreference(value: unknown): value is GhThemePreference {
  return typeof value === 'string' && GH_THEME_PREFERENCES.includes(value as GhThemePreference);
}
