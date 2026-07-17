export const GH_GRID_COLUMNS = ['auto', 1, 2, 3, 4] as const;
export const GH_GRID_MIN_ITEM_SIZES = ['sm', 'md', 'lg'] as const;
export const GH_GRID_ALIGNS = ['stretch', 'start', 'center', 'end'] as const;

export type GhGridColumns = (typeof GH_GRID_COLUMNS)[number];
export type GhGridMinItemSize = (typeof GH_GRID_MIN_ITEM_SIZES)[number];
export type GhGridAlign = (typeof GH_GRID_ALIGNS)[number];
