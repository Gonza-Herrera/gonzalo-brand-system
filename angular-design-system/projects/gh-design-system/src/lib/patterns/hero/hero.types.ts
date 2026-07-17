export const GH_HERO_ALIGNMENTS = ['start', 'center'] as const;
export const GH_HERO_LAYOUTS = ['content-only', 'split', 'centered'] as const;
export const GH_HERO_SURFACES = ['default', 'subtle', 'gradient', 'glass'] as const;
export const GH_HERO_MIN_HEIGHTS = ['auto', 'screen'] as const;
export const GH_HERO_HEADING_LEVELS = [1, 2] as const;

export type GhHeroAlignment = (typeof GH_HERO_ALIGNMENTS)[number];
export type GhHeroLayout = (typeof GH_HERO_LAYOUTS)[number];
export type GhHeroSurface = (typeof GH_HERO_SURFACES)[number];
export type GhHeroMinHeight = (typeof GH_HERO_MIN_HEIGHTS)[number];
export type GhHeroHeadingLevel = (typeof GH_HERO_HEADING_LEVELS)[number];

export interface GhHeroAction {
  readonly label: string;
  readonly href?: string;
  readonly external?: boolean;
  readonly variant?: 'primary' | 'secondary' | 'ghost';
  readonly ariaLabel?: string;
}
