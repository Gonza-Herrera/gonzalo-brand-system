import { EN_HOME_CONTENT } from './en/home.content';
import { ES_HOME_CONTENT } from './es/home.content';
import type { PortfolioHomeContent } from './models/home-content.model';
import type { PortfolioLocale } from './models/portfolio-locale.type';

const PORTFOLIO_HOME_CONTENT = {
  en: EN_HOME_CONTENT,
  es: ES_HOME_CONTENT,
} as const satisfies Readonly<Record<PortfolioLocale, PortfolioHomeContent>>;

export function getPortfolioHomeContent(locale: PortfolioLocale): PortfolioHomeContent {
  return PORTFOLIO_HOME_CONTENT[locale];
}
