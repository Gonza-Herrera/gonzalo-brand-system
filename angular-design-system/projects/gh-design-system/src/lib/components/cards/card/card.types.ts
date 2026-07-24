export const GH_CARD_VARIANTS = ['outlined', 'elevated', 'subtle', 'glass'] as const;
export const GH_CARD_PADDINGS = ['none', 'sm', 'md', 'lg'] as const;
export const GH_CARD_RADII = ['sm', 'md', 'lg', 'xl'] as const;

export type GhCardVariant = (typeof GH_CARD_VARIANTS)[number];
export type GhCardPadding = (typeof GH_CARD_PADDINGS)[number];
export type GhCardRadius = (typeof GH_CARD_RADII)[number];
