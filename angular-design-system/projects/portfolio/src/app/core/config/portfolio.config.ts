import {
  PORTFOLIO_LOCALES,
  type PortfolioLocale,
} from '../../content/models/portfolio-locale.type';

export interface PortfolioConfig {
  readonly identity: {
    readonly name: string;
  };
  readonly urls: {
    readonly linkedin?: string;
    readonly github?: string;
    readonly email?: string;
  };
  readonly defaultLocale: PortfolioLocale;
  readonly supportedLocales: readonly PortfolioLocale[];
  readonly localeStorageKey: string;
}

export const PORTFOLIO_CONFIG = {
  identity: {
    name: 'Gonzalo Herrera',
  },
  urls: {},
  defaultLocale: 'en',
  supportedLocales: PORTFOLIO_LOCALES,
  localeStorageKey: 'gh-portfolio-locale',
} as const satisfies PortfolioConfig;
