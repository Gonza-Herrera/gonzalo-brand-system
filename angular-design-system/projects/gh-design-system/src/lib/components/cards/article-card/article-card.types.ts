export interface GhArticleCardData {
  readonly title: string;
  readonly href: string;
  readonly excerpt?: string;
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly publishedAt?: string;
  readonly readingTime?: string;
  readonly category?: string;
  readonly external?: boolean;
  readonly featured?: boolean;
  readonly linkLabel?: string;
}
