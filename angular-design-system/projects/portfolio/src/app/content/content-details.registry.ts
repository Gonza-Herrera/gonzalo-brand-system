import { EN_CONTENT_DETAILS } from './en/content-details.content';
import { ES_CONTENT_DETAILS } from './es/content-details.content';
import type {
  PortfolioContentDetail,
  PortfolioContentDetailRegistry,
  PortfolioContentId,
} from './models/content-hub-content.model';
import type { PortfolioLocale } from './models/portfolio-locale.type';

const PORTFOLIO_CONTENT_DETAILS: Readonly<Record<PortfolioLocale, PortfolioContentDetailRegistry>> =
  {
    en: EN_CONTENT_DETAILS,
    es: ES_CONTENT_DETAILS,
  } as const;

export function getContentDetail(
  locale: PortfolioLocale,
  id: PortfolioContentId,
): PortfolioContentDetail | undefined {
  return PORTFOLIO_CONTENT_DETAILS[locale][id];
}
