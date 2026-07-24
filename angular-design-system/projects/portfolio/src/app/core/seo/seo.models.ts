import type { PortfolioLocale } from '../../content/models/portfolio-locale.type';
import type { PortfolioPageId } from '../../content/models/page-content.model';

export type SeoPageId = PortfolioPageId;

export interface LocalizedSeoMetadata {
  readonly title: string;
  readonly description: string;
  readonly ogTitle?: string;
  readonly ogDescription?: string;
  readonly socialImagePath?: string;
  readonly robots?: string;
}

export interface SeoPageDefinition {
  readonly id: SeoPageId;
  readonly routeSegment: string;
  readonly indexable: boolean;
  readonly metadata: Readonly<Record<PortfolioLocale, LocalizedSeoMetadata>>;
}

export interface SeoConfiguration {
  readonly siteName: string;
  readonly authorName: string;
  readonly baseUrl: string;
  readonly defaultLocale: PortfolioLocale;
  readonly supportedLocales: readonly PortfolioLocale[];
  readonly defaultSocialImagePath: string;
  readonly twitterCard: 'summary_large_image';
  readonly openGraphLocales: Readonly<Record<PortfolioLocale, string>>;
  readonly socialImageAlt: Readonly<Record<PortfolioLocale, string>>;
  readonly personJobTitle: Readonly<Record<PortfolioLocale, string>>;
  readonly personKnowsAbout: readonly string[];
  readonly verifiedProfileUrls: readonly string[];
  readonly googleSiteVerification?: string;
  readonly bingSiteVerification?: string;
}

export interface SeoUpdateInput {
  readonly pageId: SeoPageId;
  readonly locale: PortfolioLocale;
  readonly path?: string;
  readonly indexable?: boolean;
  readonly metadata?: LocalizedSeoMetadata;
}

export interface SeoAlternateLink {
  readonly hreflang: PortfolioLocale | 'x-default';
  readonly href: string;
}

export interface SeoViewModel {
  readonly title: string;
  readonly description: string;
  readonly robots: string;
  readonly indexable: boolean;
  readonly canonicalUrl?: string;
  readonly alternateLinks: readonly SeoAlternateLink[];
  readonly openGraph: {
    readonly type: 'website';
    readonly siteName: string;
    readonly title: string;
    readonly description: string;
    readonly url?: string;
    readonly image: string;
    readonly imageAlt: string;
    readonly locale: string;
    readonly alternateLocales: readonly string[];
  };
  readonly twitter: {
    readonly card: 'summary_large_image';
    readonly title: string;
    readonly description: string;
    readonly image: string;
    readonly imageAlt: string;
  };
}
