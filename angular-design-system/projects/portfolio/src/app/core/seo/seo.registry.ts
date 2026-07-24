import { EN_PAGE_METADATA } from '../../content/en/page-metadata.content';
import { ES_PAGE_METADATA } from '../../content/es/page-metadata.content';
import {
  PORTFOLIO_PAGE_IDS,
  PORTFOLIO_PAGE_PATHS,
  type PortfolioPageId,
} from '../../content/models/page-content.model';
import type { PortfolioLocale } from '../../content/models/portfolio-locale.type';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';
import type { LocalizedSeoMetadata, SeoPageDefinition } from './seo.models';

function pageMetadata(pageId: PortfolioPageId, locale: PortfolioLocale): LocalizedSeoMetadata {
  const page = locale === 'en' ? EN_PAGE_METADATA[pageId] : ES_PAGE_METADATA[pageId];
  return {
    title:
      'metaTitleIsAbsolute' in page && page.metaTitleIsAbsolute === true
        ? page.metaTitle
        : `${page.metaTitle} | ${PORTFOLIO_CONFIG.identity.name}`,
    description: page.metaDescription,
    robots: pageId === 'not-found' ? 'noindex, nofollow' : 'index, follow',
  };
}

function routeSegment(pageId: PortfolioPageId): string {
  return pageId === 'not-found' ? '' : PORTFOLIO_PAGE_PATHS[pageId];
}

export const SEO_PAGE_REGISTRY = Object.fromEntries(
  PORTFOLIO_PAGE_IDS.map((pageId) => [
    pageId,
    {
      id: pageId,
      routeSegment: routeSegment(pageId),
      indexable: pageId !== 'not-found',
      metadata: {
        en: pageMetadata(pageId, 'en'),
        es: pageMetadata(pageId, 'es'),
      },
    },
  ]),
) as Readonly<Record<PortfolioPageId, SeoPageDefinition>>;

export function getSeoPageDefinition(pageId: PortfolioPageId): SeoPageDefinition {
  return SEO_PAGE_REGISTRY[pageId];
}
