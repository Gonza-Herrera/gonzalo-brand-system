import { EN_ABOUT_CONTENT } from './en/about.content';
import { ES_ABOUT_CONTENT } from './es/about.content';
import type { PortfolioAboutContent } from './models/about-content.model';
import type { PortfolioLocale } from './models/portfolio-locale.type';

const PORTFOLIO_ABOUT_CONTENT = {
  en: EN_ABOUT_CONTENT,
  es: ES_ABOUT_CONTENT,
} as const satisfies Readonly<Record<PortfolioLocale, PortfolioAboutContent>>;

export function getPortfolioAboutContent(locale: PortfolioLocale): PortfolioAboutContent {
  return PORTFOLIO_ABOUT_CONTENT[locale];
}
