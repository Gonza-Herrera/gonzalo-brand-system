import {
  PORTFOLIO_LOCALES,
  type PortfolioLocale,
} from '../../content/models/portfolio-locale.type';

export interface PortfolioExternalLinks {
  readonly email: string | undefined;
  readonly linkedin: string | undefined;
  readonly github: string | undefined;
}

export interface PortfolioConfig {
  readonly identity: {
    readonly name: string;
  };
  readonly urls: PortfolioExternalLinks;
  readonly defaultLocale: PortfolioLocale;
  readonly supportedLocales: readonly PortfolioLocale[];
  readonly localeStorageKey: string;
}

export const PORTFOLIO_CONFIG = {
  identity: {
    name: 'Gonzalo Herrera',
  },
  urls: {
    email: undefined,
    linkedin: undefined,
    github: undefined,
  },
  defaultLocale: 'en',
  supportedLocales: PORTFOLIO_LOCALES,
  localeStorageKey: 'gh-portfolio-locale',
} as const satisfies PortfolioConfig;
