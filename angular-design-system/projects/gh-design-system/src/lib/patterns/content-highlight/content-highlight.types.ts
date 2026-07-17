export const GH_CONTENT_HIGHLIGHT_TYPES = [
  'article',
  'project',
  'linkedin',
  'resource',
  'talk',
] as const;
export const GH_CONTENT_HIGHLIGHT_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export const GH_CONTENT_HIGHLIGHT_SURFACES = ['default', 'accent', 'gradient'] as const;
export const GH_CONTENT_HIGHLIGHT_HEADING_LEVELS = [2, 3] as const;

export type GhContentHighlightType = (typeof GH_CONTENT_HIGHLIGHT_TYPES)[number];
export type GhContentHighlightOrientation = (typeof GH_CONTENT_HIGHLIGHT_ORIENTATIONS)[number];
export type GhContentHighlightSurface = (typeof GH_CONTENT_HIGHLIGHT_SURFACES)[number];
export type GhContentHighlightHeadingLevel = (typeof GH_CONTENT_HIGHLIGHT_HEADING_LEVELS)[number];
export type GhContentHighlightTypeLabels = Readonly<Record<GhContentHighlightType, string>>;

export interface GhContentHighlightData {
  readonly type: GhContentHighlightType;
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly href: string;
  readonly linkLabel: string;
  readonly external?: boolean;
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly tags?: readonly string[];
}
