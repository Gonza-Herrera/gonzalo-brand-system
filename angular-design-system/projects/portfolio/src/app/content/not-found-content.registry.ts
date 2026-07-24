import { EN_NOT_FOUND_CONTENT } from './en/not-found.content';
import { ES_NOT_FOUND_CONTENT } from './es/not-found.content';
import type { PortfolioPageContent } from './models/page-content.model';
import type { PortfolioLocale } from './models/portfolio-locale.type';

const PORTFOLIO_NOT_FOUND_CONTENT = {
  en: EN_NOT_FOUND_CONTENT,
  es: ES_NOT_FOUND_CONTENT,
} as const satisfies Readonly<Record<PortfolioLocale, PortfolioPageContent>>;

export function getPortfolioNotFoundContent(locale: PortfolioLocale): PortfolioPageContent {
  return PORTFOLIO_NOT_FOUND_CONTENT[locale];
}
