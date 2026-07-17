export const GH_INLINE_ALIGNS = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
export const GH_INLINE_JUSTIFIES = ['start', 'center', 'end', 'between', 'around'] as const;

export type GhInlineAlign = (typeof GH_INLINE_ALIGNS)[number];
export type GhInlineJustify = (typeof GH_INLINE_JUSTIFIES)[number];
