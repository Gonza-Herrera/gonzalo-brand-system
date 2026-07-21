export interface GhArticleCardData {
  readonly title: string;
  readonly href: string;
  readonly excerpt?: string;
  readonly type?: string;
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly imageWidth?: number;
  readonly imageHeight?: number;
  readonly publishedAt?: string;
  readonly publishedAtDateTime?: string;
  readonly readingTime?: string;
  readonly category?: string;
  readonly tags?: readonly string[];
  readonly external?: boolean;
  readonly featured?: boolean;
  readonly linkLabel?: string;
}

export const GH_ARTICLE_CARD_HEADING_LEVELS = [2, 3] as const;
export type GhArticleCardHeadingLevel = (typeof GH_ARTICLE_CARD_HEADING_LEVELS)[number];
