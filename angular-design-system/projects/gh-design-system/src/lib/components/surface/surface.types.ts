export const GH_SURFACE_VARIANTS = [
  'solid',
  'glass-subtle',
  'glass',
  'glass-elevated',
  'glass-floating',
] as const;

export const GH_SURFACE_PADDINGS = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
export const GH_SURFACE_RADII = ['none', 'small', 'default', 'large'] as const;

export type GhSurfaceVariant = (typeof GH_SURFACE_VARIANTS)[number];
export type GhSurfacePadding = (typeof GH_SURFACE_PADDINGS)[number];
export type GhSurfaceRadius = (typeof GH_SURFACE_RADII)[number];
