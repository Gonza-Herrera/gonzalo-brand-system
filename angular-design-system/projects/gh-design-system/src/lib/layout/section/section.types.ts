export const GH_SECTION_SPACINGS = ['none', 'sm', 'md', 'lg'] as const;
export const GH_SECTION_SURFACES = [
  'transparent',
  'primary',
  'secondary',
  'subtle',
  'accent',
] as const;

export type GhSectionSpacing = (typeof GH_SECTION_SPACINGS)[number];
export type GhSectionSurface = (typeof GH_SECTION_SURFACES)[number];
