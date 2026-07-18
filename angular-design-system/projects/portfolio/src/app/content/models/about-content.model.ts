import type { GhFeatureItem } from 'gh-design-system';

import type { PortfolioLinkContent } from './link-content.model';
import type { PortfolioPageMetadata } from './page-content.model';

export const PORTFOLIO_ABOUT_HERO_FOCUS_IDS = [
  'frontend-engineering',
  'technical-leadership',
  'angular-architecture',
  'ai-augmented-development',
  'design-systems',
  'developer-experience',
] as const;

export const PORTFOLIO_STORY_HIGHLIGHT_IDS = [
  'frontend-foundations',
  'technical-leadership',
  'ai-augmented-workflows',
  'developer-experience',
] as const;

export const PORTFOLIO_PHILOSOPHY_IDS = [
  'clarity',
  'simplicity',
  'consistency',
  'maintainability',
  'accessibility',
  'change-ready-architecture',
] as const;

export const PORTFOLIO_LEADERSHIP_PRACTICE_IDS = [
  'context',
  'feedback',
  'shared-standards',
  'ownership',
  'practical-mentoring',
] as const;

export const PORTFOLIO_AI_USE_CASE_IDS = [
  'code-review-support',
  'documentation-assistance',
  'test-analysis',
  'architecture-exploration',
  'refactoring-support',
  'knowledge-organization',
] as const;

export const PORTFOLIO_PRINCIPLE_IDS = [
  'understand-before-building',
  'explicit-decisions',
  'sustainable-solutions',
  'clear-communication',
  'build-for-people',
  'continuous-learning',
] as const;

export const PORTFOLIO_TECHNICAL_GROUP_IDS = [
  'frontend-engineering',
  'angular-architecture',
  'engineering-practices',
  'ai-augmented-development',
] as const;

export const PORTFOLIO_WORKING_STYLE_IDS = [
  'start-with-context',
  'smaller-decisions',
  'collaborate-early',
  'empathetic-review',
  'shared-documentation',
  'improve-the-system',
] as const;

export type PortfolioAboutHeroFocusId = (typeof PORTFOLIO_ABOUT_HERO_FOCUS_IDS)[number];
export type PortfolioStoryHighlightId = (typeof PORTFOLIO_STORY_HIGHLIGHT_IDS)[number];
export type PortfolioPhilosophyId = (typeof PORTFOLIO_PHILOSOPHY_IDS)[number];
export type PortfolioLeadershipPracticeId = (typeof PORTFOLIO_LEADERSHIP_PRACTICE_IDS)[number];
export type PortfolioAiUseCaseId = (typeof PORTFOLIO_AI_USE_CASE_IDS)[number];
export type PortfolioPrincipleId = (typeof PORTFOLIO_PRINCIPLE_IDS)[number];
export type PortfolioTechnicalGroupId = (typeof PORTFOLIO_TECHNICAL_GROUP_IDS)[number];
export type PortfolioWorkingStyleId = (typeof PORTFOLIO_WORKING_STYLE_IDS)[number];

export interface PortfolioAboutHeroFocusContent {
  readonly id: PortfolioAboutHeroFocusId;
  readonly label: string;
}

export interface PortfolioAboutHeroContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly role: string;
  readonly description: string;
  readonly secondaryText: string;
  readonly visualLabel: string;
  readonly focuses: readonly PortfolioAboutHeroFocusContent[];
}

export interface PortfolioStoryHighlightContent {
  readonly id: PortfolioStoryHighlightId;
  readonly label: string;
  readonly description: string;
}

export interface PortfolioProfessionalStoryContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly highlights: readonly PortfolioStoryHighlightContent[];
  readonly experienceAction: PortfolioLinkContent;
}

export interface PortfolioAboutFeatureItemContent<TId extends string> extends Omit<
  GhFeatureItem,
  'href' | 'external'
> {
  readonly id: TId;
}

export interface PortfolioAboutFeatureSectionContent<TId extends string> {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly PortfolioAboutFeatureItemContent<TId>[];
}

export type PortfolioPhilosophyContent = PortfolioAboutFeatureSectionContent<PortfolioPhilosophyId>;

export interface PortfolioLeadershipContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly practices: readonly PortfolioAboutFeatureItemContent<PortfolioLeadershipPracticeId>[];
}

export interface PortfolioAiEngineeringContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly supportingText: string;
  readonly useCases: readonly PortfolioAboutFeatureItemContent<PortfolioAiUseCaseId>[];
  readonly principleLabel: string;
  readonly principle: string;
}

export type PortfolioPrinciplesContent = PortfolioAboutFeatureSectionContent<PortfolioPrincipleId>;

export interface PortfolioTechnicalGroupContent {
  readonly id: PortfolioTechnicalGroupId;
  readonly title: string;
  readonly items: readonly string[];
}

export interface PortfolioTechnicalFocusContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly groups: readonly PortfolioTechnicalGroupContent[];
  readonly itemsLabel: string;
}

export type PortfolioWorkingStyleContent =
  PortfolioAboutFeatureSectionContent<PortfolioWorkingStyleId>;

export interface PortfolioAboutContactContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly actions: readonly PortfolioLinkContent[];
}

export interface PortfolioAboutContent extends PortfolioPageMetadata {
  readonly hero: PortfolioAboutHeroContent;
  readonly story: PortfolioProfessionalStoryContent;
  readonly philosophy: PortfolioPhilosophyContent;
  readonly leadership: PortfolioLeadershipContent;
  readonly aiEngineering: PortfolioAiEngineeringContent;
  readonly principles: PortfolioPrinciplesContent;
  readonly technicalFocus: PortfolioTechnicalFocusContent;
  readonly workingStyle: PortfolioWorkingStyleContent;
  readonly contact: PortfolioAboutContactContent;
}
