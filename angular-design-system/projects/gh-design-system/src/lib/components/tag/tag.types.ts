export const GH_TAG_MODES = ['static', 'selectable', 'removable'] as const;
export const GH_TAG_VARIANTS = ['neutral', 'accent', 'info'] as const;
export const GH_TAG_SIZES = ['sm', 'md'] as const;

export type GhTagMode = (typeof GH_TAG_MODES)[number];
export type GhTagVariant = (typeof GH_TAG_VARIANTS)[number];
export type GhTagSize = (typeof GH_TAG_SIZES)[number];
