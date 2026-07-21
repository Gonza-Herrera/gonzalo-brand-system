import type { GhContentHighlightTypeLabels } from 'gh-design-system';

import type { PortfolioLinkContent } from './link-content.model';
import type { PortfolioPageMetadata } from './page-content.model';

export const PORTFOLIO_CONTENT_IDS = [
  'angular-14-vs-angular-20',
  'lessons-from-code-reviews',
  'building-ai-agents',
  'signals-forms-vs-reactive-forms',
] as const;

export const PORTFOLIO_CONTENT_TYPES = [
  'article',
  'linkedin-post',
  'guide',
  'resource',
  'talk',
  'case-study',
] as const;

export const PORTFOLIO_CONTENT_CATEGORIES = [
  'angular',
  'frontend-engineering',
  'technical-leadership',
  'ai-engineering',
  'software-architecture',
  'developer-experience',
  'career',
] as const;

export const PORTFOLIO_CONTENT_STATUSES = ['published', 'draft', 'planned', 'archived'] as const;

export type PortfolioContentId = (typeof PORTFOLIO_CONTENT_IDS)[number];
export type PortfolioContentSlug = PortfolioContentId;
export type PortfolioContentType = (typeof PORTFOLIO_CONTENT_TYPES)[number];
export type PortfolioContentCategory = (typeof PORTFOLIO_CONTENT_CATEGORIES)[number];
export type PortfolioContentStatus = (typeof PORTFOLIO_CONTENT_STATUSES)[number];
export type PortfolioContentFilter = 'all' | PortfolioContentCategory;
export type PortfolioExternalPlatform = 'linkedin' | 'github' | 'medium' | 'youtube' | 'other';

export type PortfolioContentSource =
  | { readonly type: 'internal' }
  | {
      readonly type: 'external';
      readonly platform: PortfolioExternalPlatform;
      readonly url: string;
    };

export interface PortfolioContentImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface PortfolioContentDate {
  readonly iso: string;
  readonly label: string;
}

export interface PortfolioContentTextSection {
  readonly type: 'text';
  readonly id: string;
  readonly title?: string;
  readonly paragraphs: readonly string[];
}

export interface PortfolioContentListSection {
  readonly type: 'list';
  readonly id: string;
  readonly title?: string;
  readonly introduction?: string;
  readonly style: 'ordered' | 'unordered';
  readonly items: readonly string[];
}

export interface PortfolioContentCalloutSection {
  readonly type: 'callout';
  readonly id: string;
  readonly title?: string;
  readonly text: string;
  readonly tone: 'neutral' | 'insight' | 'warning';
}

export interface PortfolioContentCodeSection {
  readonly type: 'code';
  readonly id: string;
  readonly title?: string;
  readonly language: string;
  readonly code: string;
  readonly caption?: string;
}

export interface PortfolioComparisonColumn {
  readonly id: string;
  readonly label: string;
}

export interface PortfolioComparisonRow {
  readonly id: string;
  readonly label: string;
  readonly cells: readonly string[];
}

export interface PortfolioContentComparisonSection {
  readonly type: 'comparison';
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly columns: readonly PortfolioComparisonColumn[];
  readonly rows: readonly PortfolioComparisonRow[];
}

export type PortfolioContentSection =
  | PortfolioContentTextSection
  | PortfolioContentListSection
  | PortfolioContentCalloutSection
  | PortfolioContentCodeSection
  | PortfolioContentComparisonSection;

export interface PortfolioContentTakeaways {
  readonly title: string;
  readonly items: readonly string[];
}

export interface PortfolioContentDetail {
  readonly introduction?: readonly string[];
  readonly sections: readonly PortfolioContentSection[];
  readonly takeaways?: PortfolioContentTakeaways;
  readonly relatedContentIds?: readonly PortfolioContentId[];
}

export interface PortfolioContentItem {
  readonly id: PortfolioContentId;
  readonly slug: PortfolioContentSlug;
  readonly title: string;
  readonly excerpt: string;
  readonly type: PortfolioContentType;
  readonly typeLabel: string;
  readonly category: PortfolioContentCategory;
  readonly categoryLabel: string;
  readonly status: PortfolioContentStatus;
  readonly statusLabel: string;
  readonly tags: readonly string[];
  readonly featured: boolean;
  readonly order: number;
  readonly source: PortfolioContentSource;
  readonly detailAvailable: boolean;
  readonly publishedAt?: PortfolioContentDate;
  readonly readingTime?: string;
  readonly image?: PortfolioContentImage;
}

export type PortfolioContentDetailRegistry = Readonly<
  Partial<Record<PortfolioContentId, PortfolioContentDetail>>
>;

export interface PortfolioContentHeroContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly visualLabel: string;
  readonly visualTitle: string;
  readonly topics: readonly string[];
}

export interface PortfolioContentSectionHeading {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

export interface PortfolioContentFilterOption {
  readonly id: PortfolioContentFilter;
  readonly label: string;
}

export interface PortfolioContentFiltersContent extends PortfolioContentSectionHeading {
  readonly label: string;
  readonly options: readonly PortfolioContentFilterOption[];
}

export interface PortfolioContentCardLabels {
  readonly article: string;
  readonly featured: string;
  readonly topics: string;
  readonly read: string;
  readonly viewExternal: string;
  readonly externalLink: string;
}

export interface PortfolioContentGridContent extends PortfolioContentSectionHeading {
  readonly cardLabels: PortfolioContentCardLabels;
}

export interface PortfolioContentEmptyContent {
  readonly title: string;
  readonly description: string;
  readonly resetLabel: string;
}

export interface PortfolioContentDetailLabels {
  readonly backToContent: string;
  readonly introduction: string;
  readonly metadataLabel: string;
  readonly publishedAt: string;
  readonly readingTime: string;
  readonly tags: string;
  readonly codeLanguage: string;
  readonly comparisonAspect: string;
  readonly relatedEyebrow: string;
  readonly relatedTitle: string;
  readonly relatedDescription: string;
  readonly notFoundEyebrow: string;
  readonly notFoundTitle: string;
  readonly notFoundDescription: string;
  readonly notFoundMetaTitle: string;
  readonly notFoundMetaDescription: string;
}

export interface PortfolioContentContactContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly actions: readonly PortfolioLinkContent[];
}

export interface PortfolioContentHubContent extends PortfolioPageMetadata {
  readonly hero: PortfolioContentHeroContent;
  readonly featured: PortfolioContentSectionHeading & { readonly linkLabel: string };
  readonly filters: PortfolioContentFiltersContent;
  readonly grid: PortfolioContentGridContent;
  readonly empty: PortfolioContentEmptyContent;
  readonly detail: PortfolioContentDetailLabels;
  readonly contact: PortfolioContentContactContent;
  readonly typeLabels: GhContentHighlightTypeLabels;
  readonly items: readonly PortfolioContentItem[];
}
