export const GH_FEATURE_GRID_COLUMNS = [2, 3, 4, 'auto'] as const;
export const GH_FEATURE_GRID_VARIANTS = ['cards', 'minimal'] as const;

export type GhFeatureGridColumns = (typeof GH_FEATURE_GRID_COLUMNS)[number];
export type GhFeatureGridVariant = (typeof GH_FEATURE_GRID_VARIANTS)[number];

export interface GhFeatureItem {
  readonly title: string;
  readonly description: string;
  readonly eyebrow?: string;
  readonly iconLabel?: string;
  readonly href?: string;
  readonly external?: boolean;
}
