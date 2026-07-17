import { EN_SITE_CONTENT } from './en/site-content';
import { ES_SITE_CONTENT } from './es/site-content';
import type { PortfolioLocale } from './models/portfolio-locale.type';
import type { PortfolioSiteContent } from './models/site-content.model';

export const PORTFOLIO_CONTENT = {
  en: EN_SITE_CONTENT,
  es: ES_SITE_CONTENT,
} as const satisfies Readonly<Record<PortfolioLocale, PortfolioSiteContent>>;

export function getPortfolioContent(locale: PortfolioLocale): PortfolioSiteContent {
  return PORTFOLIO_CONTENT[locale];
}
