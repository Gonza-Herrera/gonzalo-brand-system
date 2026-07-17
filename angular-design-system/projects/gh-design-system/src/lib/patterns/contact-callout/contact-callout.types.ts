export const GH_CONTACT_CALLOUT_ALIGNMENTS = ['start', 'center'] as const;
export const GH_CONTACT_CALLOUT_SURFACES = ['subtle', 'accent', 'gradient'] as const;

export type GhContactCalloutAlignment = (typeof GH_CONTACT_CALLOUT_ALIGNMENTS)[number];
export type GhContactCalloutSurface = (typeof GH_CONTACT_CALLOUT_SURFACES)[number];

export interface GhContactAction {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
  readonly variant?: 'primary' | 'secondary' | 'ghost';
  readonly ariaLabel?: string;
}
