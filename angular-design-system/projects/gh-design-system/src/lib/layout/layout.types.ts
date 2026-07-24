export const GH_LAYOUT_GAPS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export type GhLayoutGap = (typeof GH_LAYOUT_GAPS)[number];
