import type { GhExperienceCardLabels, GhExperienceWorkMode, GhFeatureItem } from 'gh-design-system';

import type { PortfolioLinkContent } from './link-content.model';
import type { PortfolioPageMetadata } from './page-content.model';

export const PORTFOLIO_EXPERIENCE_HIGHLIGHT_IDS = [
  'frontend-engineering',
  'angular-architecture',
  'technical-leadership',
  'ai-augmented-development',
] as const;

export const PORTFOLIO_EXPERIENCE_LEADERSHIP_IDS = [
  'frontend-architecture',
  'code-review-quality',
  'technical-mentoring',
  'engineering-standards',
  'delivery-collaboration',
  'developer-experience',
] as const;

export const PORTFOLIO_EXPERIENCE_WAY_OF_WORKING_IDS = [
  'understand-problem',
  'small-decisions',
  'collaborate-early',
  'deliver-incrementally',
  'review-constructively',
  'document-decisions',
] as const;

export const PORTFOLIO_EXPERIENCE_CAPABILITY_GROUP_IDS = [
  'frontend-engineering',
  'architecture-quality',
  'leadership-collaboration',
  'delivery-tooling',
  'ai-augmented-engineering',
] as const;

export const PORTFOLIO_EXPERIENCE_DIRECTION_IDS = [
  'frontend-tech-leadership',
  'angular-architecture',
  'design-systems',
  'developer-experience',
  'ai-augmented-engineering',
  'engineering-mentoring',
] as const;

export const PORTFOLIO_PROFESSIONAL_EXPERIENCE_IDS = [
  'icbc-frontend-developer',
  'endava-team-leader',
  'vortex-frontend-developer',
  'develative-frontend-developer',
  'develative-project-manager',
] as const;

export type PortfolioExperienceHighlightId = (typeof PORTFOLIO_EXPERIENCE_HIGHLIGHT_IDS)[number];
export type PortfolioExperienceLeadershipId = (typeof PORTFOLIO_EXPERIENCE_LEADERSHIP_IDS)[number];
export type PortfolioExperienceWayOfWorkingId =
  (typeof PORTFOLIO_EXPERIENCE_WAY_OF_WORKING_IDS)[number];
export type PortfolioExperienceCapabilityGroupId =
  (typeof PORTFOLIO_EXPERIENCE_CAPABILITY_GROUP_IDS)[number];
export type PortfolioExperienceDirectionId = (typeof PORTFOLIO_EXPERIENCE_DIRECTION_IDS)[number];
export type PortfolioProfessionalExperienceId =
  (typeof PORTFOLIO_PROFESSIONAL_EXPERIENCE_IDS)[number];

export interface PortfolioExperienceHeroHighlightContent {
  readonly id: PortfolioExperienceHighlightId;
  readonly label: string;
}

export interface PortfolioExperienceHeroContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly visualLabel: string;
  readonly visualTitle: string;
  readonly highlights: readonly PortfolioExperienceHeroHighlightContent[];
}

export interface PortfolioCareerSummaryContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly focusAreasLabel: string;
  readonly focusAreas: readonly string[];
}

export interface PortfolioExperienceLogoContent {
  readonly src: string;
  readonly alt: string;
}

export interface PortfolioProfessionalExperienceContent {
  readonly id: PortfolioProfessionalExperienceId;
  readonly order: number;
  readonly role: string;
  readonly company: string;
  readonly startDate: string;
  readonly endDate?: string;
  readonly location?: string;
  readonly workMode?: GhExperienceWorkMode;
  readonly summary: readonly string[];
  readonly responsibilities: readonly string[];
  readonly achievements?: readonly string[];
  readonly technologies?: readonly string[];
  readonly capabilities?: readonly string[];
  readonly current: boolean;
  readonly logo?: PortfolioExperienceLogoContent;
  readonly confidentialityNote?: string;
}

export interface PortfolioExperienceTimelineLabels {
  readonly card: GhExperienceCardLabels;
  readonly current: string;
  readonly workModes: Readonly<Record<GhExperienceWorkMode, string>>;
}

export interface PortfolioExperienceTimelineContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly labels: PortfolioExperienceTimelineLabels;
  readonly items: readonly PortfolioProfessionalExperienceContent[];
}

export interface PortfolioExperienceFeatureItemContent<TId extends string> extends Omit<
  GhFeatureItem,
  'href' | 'external'
> {
  readonly id: TId;
}

export interface PortfolioExperienceFeatureSectionContent<TId extends string> {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly PortfolioExperienceFeatureItemContent<TId>[];
}

export type PortfolioExperienceLeadershipContent =
  PortfolioExperienceFeatureSectionContent<PortfolioExperienceLeadershipId>;

export type PortfolioExperienceWaysOfWorkingContent =
  PortfolioExperienceFeatureSectionContent<PortfolioExperienceWayOfWorkingId>;

export interface PortfolioExperienceCapabilityGroupContent {
  readonly id: PortfolioExperienceCapabilityGroupId;
  readonly title: string;
  readonly items: readonly string[];
}

export interface PortfolioExperienceCapabilitiesContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly groups: readonly PortfolioExperienceCapabilityGroupContent[];
  readonly itemsLabel: string;
}

export interface PortfolioExperienceDirectionPointContent {
  readonly id: PortfolioExperienceDirectionId;
  readonly label: string;
}

export interface PortfolioExperienceCareerDirectionContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly pointsLabel: string;
  readonly points: readonly PortfolioExperienceDirectionPointContent[];
  readonly projectsAction: PortfolioLinkContent;
}

export interface PortfolioExperienceContactContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly actions: readonly PortfolioLinkContent[];
}

export interface PortfolioExperienceContent extends PortfolioPageMetadata {
  readonly hero: PortfolioExperienceHeroContent;
  readonly summary: PortfolioCareerSummaryContent;
  readonly timeline: PortfolioExperienceTimelineContent;
  readonly leadership: PortfolioExperienceLeadershipContent;
  readonly waysOfWorking: PortfolioExperienceWaysOfWorkingContent;
  readonly capabilities: PortfolioExperienceCapabilitiesContent;
  readonly careerDirection: PortfolioExperienceCareerDirectionContent;
  readonly contact: PortfolioExperienceContactContent;
}
