export const GH_AMBIENT_PRESETS = ['none', 'subtle', 'brand', 'cool', 'warm'] as const;
export const GH_AMBIENT_INTENSITIES = ['subtle', 'default', 'strong'] as const;

export type GhAmbientPreset = (typeof GH_AMBIENT_PRESETS)[number];
export type GhAmbientIntensity = (typeof GH_AMBIENT_INTENSITIES)[number];
