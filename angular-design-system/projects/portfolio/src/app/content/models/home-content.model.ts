import type {
  GhContentHighlightTypeLabels,
  GhExperienceCardData,
  GhExperienceCardLabels,
  GhFeatureItem,
} from 'gh-design-system';

import type { PortfolioLinkContent } from './link-content.model';
import type { PortfolioContentItem } from './content-hub-content.model';
import type { PortfolioPageMetadata } from './page-content.model';
import type { PortfolioProjectCardLabels, PortfolioProjectContent } from './projects-content.model';

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

export type PortfolioHeroHighlightId = (typeof PORTFOLIO_HERO_HIGHLIGHT_IDS)[number];
export type PortfolioExpertiseId = (typeof PORTFOLIO_EXPERTISE_IDS)[number];

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

export interface PortfolioSelectedProjectsContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly viewAllAction: PortfolioLinkContent;
  readonly cardLabels: PortfolioProjectCardLabels;
  readonly items: readonly PortfolioProjectContent[];
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
  readonly cardLabels: GhExperienceCardLabels;
  readonly items: readonly PortfolioExperiencePreviewItem[];
}

export interface PortfolioFeaturedContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly typeLabels: GhContentHighlightTypeLabels;
  readonly tagsLabel: string;
  readonly linkLabel: string;
  readonly item: PortfolioContentItem;
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
