export const GH_SECTION_HEADING_ALIGNMENTS = ['start', 'center'] as const;
export const GH_SECTION_HEADING_LEVELS = [2, 3, 4] as const;

export type GhSectionHeadingAlignment = (typeof GH_SECTION_HEADING_ALIGNMENTS)[number];
export type GhSectionHeadingLevel = (typeof GH_SECTION_HEADING_LEVELS)[number];
