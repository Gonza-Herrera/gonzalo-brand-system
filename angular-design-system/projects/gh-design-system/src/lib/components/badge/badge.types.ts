export const GH_BADGE_VARIANTS = [
  'neutral',
  'info',
  'success',
  'warning',
  'danger',
  'accent',
] as const;
export const GH_BADGE_SIZES = ['sm', 'md'] as const;
export const GH_BADGE_APPEARANCES = ['soft', 'solid'] as const;
export const GH_BADGE_ROUNDED_OPTIONS = ['default', 'pill'] as const;

export type GhBadgeVariant = (typeof GH_BADGE_VARIANTS)[number];
export type GhBadgeSize = (typeof GH_BADGE_SIZES)[number];
export type GhBadgeAppearance = (typeof GH_BADGE_APPEARANCES)[number];
export type GhBadgeRounded = (typeof GH_BADGE_ROUNDED_OPTIONS)[number];
