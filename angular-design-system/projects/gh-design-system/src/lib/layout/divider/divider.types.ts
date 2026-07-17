export const GH_DIVIDER_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export const GH_DIVIDER_STYLES = ['solid', 'dashed'] as const;
export const GH_DIVIDER_TONES = ['subtle', 'default', 'strong'] as const;

export type GhDividerOrientation = (typeof GH_DIVIDER_ORIENTATIONS)[number];
export type GhDividerStyle = (typeof GH_DIVIDER_STYLES)[number];
export type GhDividerTone = (typeof GH_DIVIDER_TONES)[number];
