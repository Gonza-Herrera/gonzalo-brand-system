import type { GhProjectStatus } from 'gh-design-system';

import type { PortfolioLinkContent } from './link-content.model';
import type { PortfolioPageMetadata } from './page-content.model';

export const PORTFOLIO_PROJECT_IDS = [
  'angular-design-system',
  'ai-code-review-assistant',
  'angular-accelerator-kit',
  'ai-toolkit-for-developers',
] as const;

export const PORTFOLIO_PROJECT_SLUGS = PORTFOLIO_PROJECT_IDS;

export const PORTFOLIO_PROJECT_CATEGORIES = [
  'design-system',
  'angular',
  'ai-engineering',
  'developer-tools',
] as const;

export type PortfolioProjectId = (typeof PORTFOLIO_PROJECT_IDS)[number];
export type PortfolioProjectSlug = (typeof PORTFOLIO_PROJECT_SLUGS)[number];
export type PortfolioProjectCategory = (typeof PORTFOLIO_PROJECT_CATEGORIES)[number];
export type PortfolioProjectStatus = GhProjectStatus;

export type PortfolioProjectLinkKind = 'repository' | 'live-demo' | 'documentation' | 'story';

export interface PortfolioProjectLinkContent {
  readonly id: string;
  readonly kind: PortfolioProjectLinkKind;
  readonly label: string;
  readonly href: string;
  readonly external: true;
}

export interface PortfolioProjectImageContent {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface PortfolioProjectTextSectionContent {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly paragraphs?: readonly string[];
  readonly items?: readonly string[];
}

export interface PortfolioProjectSummaryContent {
  readonly title: string;
  readonly description?: string;
  readonly role?: string;
  readonly type?: string;
  readonly focus?: string;
}

export interface PortfolioProjectRoleContent extends PortfolioProjectTextSectionContent {
  readonly responsibilities: readonly string[];
  readonly aiDisclosure?: string;
}

export interface PortfolioProjectApproachContent extends PortfolioProjectTextSectionContent {
  readonly steps: readonly string[];
  readonly flowLabel: string;
}

export interface PortfolioProjectArchitectureContent {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly flowLabel: string;
  readonly stages: readonly string[];
  readonly consumersLabel: string;
  readonly consumers: readonly string[];
}

export interface PortfolioProjectDecisionContent {
  readonly id: string;
  readonly title: string;
  readonly context: string;
  readonly decision: string;
  readonly rationale: string;
  readonly tradeOffs?: readonly string[];
}

export interface PortfolioProjectDecisionsSectionContent {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly items: readonly PortfolioProjectDecisionContent[];
}

export interface PortfolioProjectImplementationPhaseContent {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly string[];
  readonly outcome: string;
}

export interface PortfolioProjectImplementationSectionContent {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly phases: readonly PortfolioProjectImplementationPhaseContent[];
}

export interface PortfolioProjectChallengeContent {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly response: string;
}

export interface PortfolioProjectChallengesSectionContent {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly items: readonly PortfolioProjectChallengeContent[];
}

export interface PortfolioProjectResultContent {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface PortfolioProjectResultsSectionContent {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly items: readonly PortfolioProjectResultContent[];
}

export interface PortfolioProjectCaseStudyContent {
  readonly available: true;
  readonly eyebrow: string;
  readonly summary: PortfolioProjectSummaryContent;
  readonly context: PortfolioProjectTextSectionContent;
  readonly problem: PortfolioProjectTextSectionContent;
  readonly goals: PortfolioProjectTextSectionContent;
  readonly constraints: PortfolioProjectTextSectionContent;
  readonly role: PortfolioProjectRoleContent;
  readonly approach: PortfolioProjectApproachContent;
  readonly architecture: PortfolioProjectArchitectureContent;
  readonly decisions: PortfolioProjectDecisionsSectionContent;
  readonly implementation: PortfolioProjectImplementationSectionContent;
  readonly challenges: PortfolioProjectChallengesSectionContent;
  readonly results: PortfolioProjectResultsSectionContent;
  readonly lessons: PortfolioProjectTextSectionContent;
  readonly nextSteps: PortfolioProjectTextSectionContent;
}

export interface PortfolioProjectUnavailableCaseStudyContent {
  readonly available: false;
  readonly title: string;
  readonly description: string;
}

export interface PortfolioProjectContent {
  readonly id: PortfolioProjectId;
  readonly slug: PortfolioProjectSlug;
  readonly title: string;
  readonly shortDescription: string;
  readonly status: PortfolioProjectStatus;
  readonly statusLabel: string;
  readonly category: PortfolioProjectCategory;
  readonly categoryLabel: string;
  readonly technologies: readonly string[];
  readonly capabilities?: readonly string[];
  readonly featured: boolean;
  readonly order: number;
  readonly image?: PortfolioProjectImageContent;
  readonly links?: readonly PortfolioProjectLinkContent[];
  readonly caseStudy:
    PortfolioProjectCaseStudyContent | PortfolioProjectUnavailableCaseStudyContent;
}

export type PortfolioProjectPreviewContent = Omit<PortfolioProjectContent, 'caseStudy'> & {
  readonly caseStudy: {
    readonly available: boolean;
  };
};

export interface PortfolioProjectCardLabels {
  readonly projectPrefix: string;
  readonly featured: string;
  readonly technologies: string;
  readonly links: string;
  readonly caseStudy: string;
  readonly repository: string;
}

export interface PortfolioProjectsHeroContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly visualLabel: string;
  readonly focuses: readonly string[];
}

export interface PortfolioProjectsOverviewContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly statusNote: string;
  readonly categoriesLabel: string;
}

export interface PortfolioProjectsGridContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly cardLabels: PortfolioProjectCardLabels;
}

export interface PortfolioProjectDetailLabels {
  readonly backToProjects: string;
  readonly summaryTitle: string;
  readonly summaryDescription: string;
  readonly status: string;
  readonly type: string;
  readonly role: string;
  readonly focus: string;
  readonly technologies: string;
  readonly responsibilities: string;
  readonly aiDisclosure: string;
  readonly decisionContext: string;
  readonly decision: string;
  readonly rationale: string;
  readonly tradeOffs: string;
  readonly phaseItems: string;
  readonly phaseOutcome: string;
  readonly challengeResponse: string;
  readonly relatedEyebrow: string;
  readonly relatedTitle: string;
  readonly relatedDescription: string;
  readonly notFoundEyebrow: string;
  readonly notFoundTitle: string;
  readonly notFoundDescription: string;
  readonly notFoundMetaTitle: string;
  readonly notFoundMetaDescription: string;
}

export interface PortfolioProjectsContactContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly actions: readonly PortfolioLinkContent[];
}

export interface PortfolioProjectsContent extends PortfolioPageMetadata {
  readonly hero: PortfolioProjectsHeroContent;
  readonly overview: PortfolioProjectsOverviewContent;
  readonly grid: PortfolioProjectsGridContent;
  readonly detail: PortfolioProjectDetailLabels;
  readonly contact: PortfolioProjectsContactContent;
  readonly items: readonly PortfolioProjectContent[];
}
