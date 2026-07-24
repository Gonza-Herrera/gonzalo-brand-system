import { EN_CONTENT_HUB_CONTENT } from './en/content-hub.content';
import { ES_CONTENT_HUB_CONTENT } from './es/content-hub.content';
import type { PortfolioContentHubContent } from './models/content-hub-content.model';
import type { PortfolioLocale } from './models/portfolio-locale.type';

const PORTFOLIO_CONTENT_HUB_CONTENT = {
  en: EN_CONTENT_HUB_CONTENT,
  es: ES_CONTENT_HUB_CONTENT,
} as const satisfies Readonly<Record<PortfolioLocale, PortfolioContentHubContent>>;

export function getPortfolioContentHubContent(locale: PortfolioLocale): PortfolioContentHubContent {
  return PORTFOLIO_CONTENT_HUB_CONTENT[locale];
}
