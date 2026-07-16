export const GH_BUTTON_VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const;
export const GH_BUTTON_SIZES = ['sm', 'md', 'lg'] as const;
export const GH_BUTTON_TYPES = ['button', 'submit', 'reset'] as const;

export type GhButtonVariant = (typeof GH_BUTTON_VARIANTS)[number];
export type GhButtonSize = (typeof GH_BUTTON_SIZES)[number];
export type GhButtonType = (typeof GH_BUTTON_TYPES)[number];
