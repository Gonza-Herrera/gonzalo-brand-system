import type {
  GhContentHighlightData,
  GhContentHighlightTypeLabels,
  GhExperienceCardData,
  GhFeatureItem,
  GhHeroAction,
  GhProjectCardData,
  GhProjectStatus,
} from 'gh-design-system';

import type { PortfolioPageMetadata } from './page-content.model';
import type { PortfolioNavigationPageId } from './page-content.model';

export const PORTFOLIO_HERO_HIGHLIGHT_IDS = [
  'frontend-engineering',
  'technical-leadership',
  'ai-augmented-development',
] as const;

export const PORTFOLIO_EXPERTISE_IDS = [
  'frontend-engineering',
  'technical-leadership',
  'angular-architecture',
  'ai-augmented-development',
  'developer-experience',
  'mentoring-code-quality',
] as const;

export const PORTFOLIO_PROJECT_IDS = [
  'angular-design-system',
  'ai-code-review-assistant',
  'angular-accelerator-kit',
  'ai-toolkit-for-developers',
] as const;

export type PortfolioHeroHighlightId = (typeof PORTFOLIO_HERO_HIGHLIGHT_IDS)[number];
export type PortfolioExpertiseId = (typeof PORTFOLIO_EXPERTISE_IDS)[number];
export type PortfolioProjectId = (typeof PORTFOLIO_PROJECT_IDS)[number];
export type PortfolioActionVariant = NonNullable<GhHeroAction['variant']>;

interface PortfolioLinkBase {
  readonly label: string;
  readonly variant?: PortfolioActionVariant;
  readonly ariaLabel?: string;
}

export type PortfolioLinkContent = PortfolioLinkBase &
  (
    | {
        readonly pageId: PortfolioNavigationPageId;
        readonly href?: never;
        readonly external?: false;
      }
    | {
        readonly href: string;
        readonly external: true;
        readonly pageId?: never;
      }
  );

export interface PortfolioHighlightContent {
  readonly id: PortfolioHeroHighlightId;
  readonly label: string;
  readonly value: string;
}

export interface PortfolioHomeHeroContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly role: string;
  readonly description: string;
  readonly visualLabel: string;
  readonly primaryAction: PortfolioLinkContent;
  readonly secondaryAction: PortfolioLinkContent;
  readonly highlights: readonly PortfolioHighlightContent[];
}

export interface PortfolioExpertiseItemContent extends Omit<GhFeatureItem, 'href' | 'external'> {
  readonly id: PortfolioExpertiseId;
}

export interface PortfolioHomeExpertiseContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly PortfolioExpertiseItemContent[];
}

export interface PortfolioProjectPreviewContent extends Omit<
  GhProjectCardData,
  | 'projectUrl'
  | 'repositoryUrl'
  | 'projectLinkLabel'
  | 'repositoryLinkLabel'
  | 'status'
  | 'statusLabel'
> {
  readonly id: PortfolioProjectId;
  readonly status: GhProjectStatus;
  readonly statusLabel: string;
  readonly projectLink?: PortfolioLinkContent;
  readonly repositoryLink?: PortfolioLinkContent;
}

export interface PortfolioProjectCardLabels {
  readonly projectPrefix: string;
  readonly featured: string;
  readonly technologies: string;
  readonly links: string;
}

export interface PortfolioSelectedProjectsContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly viewAllAction: PortfolioLinkContent;
  readonly cardLabels: PortfolioProjectCardLabels;
  readonly items: readonly PortfolioProjectPreviewContent[];
}

export interface PortfolioExperiencePreviewItem extends GhExperienceCardData {
  readonly id: string;
}

export interface PortfolioExperiencePreviewContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly verificationNotice: string;
  readonly viewAllAction: PortfolioLinkContent;
  readonly items: readonly PortfolioExperiencePreviewItem[];
}

export interface PortfolioContentHighlightItem extends Omit<
  GhContentHighlightData,
  'href' | 'linkLabel'
> {
  readonly id: string;
  readonly link: PortfolioLinkContent;
}

export interface PortfolioFeaturedContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly typeLabels: GhContentHighlightTypeLabels;
  readonly tagsLabel: string;
  readonly item: PortfolioContentHighlightItem;
}

export interface PortfolioHomeContactContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly actions: readonly PortfolioLinkContent[];
}

export interface PortfolioHomeContent extends PortfolioPageMetadata {
  readonly hero: PortfolioHomeHeroContent;
  readonly expertise: PortfolioHomeExpertiseContent;
  readonly selectedProjects: PortfolioSelectedProjectsContent;
  readonly experience: PortfolioExperiencePreviewContent;
  readonly featuredContent: PortfolioFeaturedContent;
  readonly contact: PortfolioHomeContactContent;
}
