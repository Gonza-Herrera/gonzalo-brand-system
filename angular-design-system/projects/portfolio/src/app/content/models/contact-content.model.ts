import type { PortfolioLinkContent } from './link-content.model';
import type { PortfolioPageMetadata } from './page-content.model';

export const PORTFOLIO_CONTACT_HIGHLIGHT_IDS = ['engineering', 'leadership', 'ai'] as const;

export const PORTFOLIO_CONTACT_TOPIC_IDS = [
  'frontend-platforms',
  'angular-architecture',
  'design-systems',
  'technical-leadership',
  'ai-engineering',
  'professional-opportunities',
] as const;

export const PORTFOLIO_CONTACT_CHANNEL_IDS = ['email', 'linkedin', 'github'] as const;

export type PortfolioContactHighlightId = (typeof PORTFOLIO_CONTACT_HIGHLIGHT_IDS)[number];
export type PortfolioContactTopicId = (typeof PORTFOLIO_CONTACT_TOPIC_IDS)[number];
export type PortfolioContactChannelId = (typeof PORTFOLIO_CONTACT_CHANNEL_IDS)[number];

export interface PortfolioContactHighlightContent {
  readonly id: PortfolioContactHighlightId;
  readonly label: string;
  readonly description: string;
}

export interface PortfolioContactHeroContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly visualLabel: string;
  readonly visualTitle: string;
  readonly highlights: readonly PortfolioContactHighlightContent[];
}

export interface PortfolioContactTopicContent {
  readonly id: PortfolioContactTopicId;
  readonly title: string;
  readonly description: string;
}

export interface PortfolioContactTopicsContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly PortfolioContactTopicContent[];
}

export interface PortfolioContactChannelContent {
  readonly id: PortfolioContactChannelId;
  readonly label: string;
  readonly description: string;
  readonly actionLabel?: string;
  readonly ariaLabel: string;
  readonly external: boolean;
}

export interface PortfolioContactChannelsContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly unavailableTitle: string;
  readonly unavailableDescription: string;
  readonly items: readonly PortfolioContactChannelContent[];
}

export interface PortfolioContactFieldContent {
  readonly label: string;
  readonly description: string;
  readonly placeholder: string;
  readonly requiredMessage?: string;
  readonly whitespaceMessage?: string;
  readonly invalidMessage?: string;
  readonly minLengthMessage?: string;
  readonly maxLengthMessage: string;
}

export interface PortfolioContactFormStatusContent {
  readonly title: string;
  readonly description: string;
  readonly actionLabel?: string;
}

export interface PortfolioContactFormContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly requiredFieldsMessage: string;
  readonly requiredLabel: string;
  readonly fieldGroupLabel: string;
  readonly botcheckLabel: string;
  readonly fallbackEmailLabel: string;
  readonly fields: {
    readonly name: PortfolioContactFieldContent;
    readonly email: PortfolioContactFieldContent;
    readonly subject: PortfolioContactFieldContent;
    readonly message: PortfolioContactFieldContent;
  };
  readonly submitLabel: string;
  readonly submittingLabel: string;
  readonly errorSummary: string;
  readonly errorWithoutFallbackDescription: string;
  readonly unavailable: PortfolioContactFormStatusContent;
  readonly success: PortfolioContactFormStatusContent;
  readonly error: PortfolioContactFormStatusContent;
}

export interface PortfolioContactPrivacyContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly details: readonly string[];
}

export type PortfolioContactExploreActionContent = PortfolioLinkContent & {
  readonly description: string;
};

export interface PortfolioContactExploreContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly actions: readonly PortfolioContactExploreActionContent[];
}

export interface PortfolioContactContent extends PortfolioPageMetadata {
  readonly hero: PortfolioContactHeroContent;
  readonly topics: PortfolioContactTopicsContent;
  readonly channels: PortfolioContactChannelsContent;
  readonly form: PortfolioContactFormContent;
  readonly privacy: PortfolioContactPrivacyContent;
  readonly explore: PortfolioContactExploreContent;
}
