import type { GhSurfaceVariant } from '../surface/surface.types';

export const GH_GLASS_PANEL_VARIANTS = [
  'glass-subtle',
  'glass',
  'glass-elevated',
] as const satisfies readonly GhSurfaceVariant[];

export type GhGlassPanelVariant = Extract<
  GhSurfaceVariant,
  'glass-subtle' | 'glass' | 'glass-elevated'
>;
