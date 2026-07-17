export const GH_STACK_ALIGNS = ['stretch', 'start', 'center', 'end'] as const;
export const GH_STACK_JUSTIFIES = ['start', 'center', 'end', 'between'] as const;

export type GhStackAlign = (typeof GH_STACK_ALIGNS)[number];
export type GhStackJustify = (typeof GH_STACK_JUSTIFIES)[number];
