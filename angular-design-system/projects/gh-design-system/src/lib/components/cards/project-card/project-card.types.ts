export const GH_PROJECT_STATUSES = ['concept', 'in-progress', 'completed', 'archived'] as const;
export const GH_PROJECT_CARD_ORIENTATIONS = ['vertical', 'horizontal'] as const;
export const GH_PROJECT_CARD_HEADING_LEVELS = [2, 3] as const;

export type GhProjectStatus = (typeof GH_PROJECT_STATUSES)[number];
export type GhProjectCardOrientation = (typeof GH_PROJECT_CARD_ORIENTATIONS)[number];
export type GhProjectCardHeadingLevel = (typeof GH_PROJECT_CARD_HEADING_LEVELS)[number];

export interface GhProjectCardData {
  readonly title: string;
  readonly description: string;
  readonly technologies?: readonly string[];
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly projectUrl?: string;
  readonly repositoryUrl?: string;
  readonly projectLinkLabel?: string;
  readonly repositoryLinkLabel?: string;
  readonly status?: GhProjectStatus;
  readonly statusLabel?: string;
  readonly featured?: boolean;
}
