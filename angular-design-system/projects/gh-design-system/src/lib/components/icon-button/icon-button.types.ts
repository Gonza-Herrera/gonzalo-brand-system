import {
  GH_BUTTON_SIZES,
  GH_BUTTON_TYPES,
  type GhButtonSize,
  type GhButtonType,
} from '../button/button.types';

export const GH_ICON_BUTTON_VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const;
export const GH_ICON_BUTTON_SIZES = GH_BUTTON_SIZES;
export const GH_ICON_BUTTON_TYPES = GH_BUTTON_TYPES;

export type GhIconButtonVariant = (typeof GH_ICON_BUTTON_VARIANTS)[number];
export type GhIconButtonSize = GhButtonSize;
export type GhIconButtonType = GhButtonType;
