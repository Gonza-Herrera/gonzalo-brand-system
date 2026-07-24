import type {
  GhArticleCardData,
  GhContentHighlightData,
  GhContentHighlightType,
} from 'gh-design-system';

import type {
  PortfolioContentCardLabels,
  PortfolioContentItem,
  PortfolioContentType,
} from '../models/content-hub-content.model';
import type { PortfolioLocale } from '../models/portfolio-locale.type';
import { createLocalizedContentPath } from './content-selectors';

function resolveContentHref(
  item: PortfolioContentItem,
  locale: PortfolioLocale,
): string | undefined {
  if (item.source.type === 'external') {
    return item.source.url;
  }

  return item.detailAvailable ? createLocalizedContentPath(locale, item.slug) : undefined;
}

function mapHighlightType(type: PortfolioContentType): GhContentHighlightType {
  switch (type) {
    case 'linkedin-post':
      return 'linkedin';
    case 'guide':
    case 'resource':
      return 'resource';
    case 'talk':
      return 'talk';
    case 'case-study':
      return 'project';
    default:
      return 'article';
  }
}

export function mapContentToArticleCard(
  item: PortfolioContentItem,
  locale: PortfolioLocale,
  labels: PortfolioContentCardLabels,
): GhArticleCardData | undefined {
  const href = resolveContentHref(item, locale);
  if (!href) {
    return undefined;
  }

  const external = item.source.type === 'external';

  return {
    title: item.title,
    href,
    excerpt: item.excerpt,
    type: item.typeLabel,
    category: item.categoryLabel,
    tags: item.tags,
    imageSrc: item.image?.src,
    imageAlt: item.image?.alt,
    imageWidth: item.image?.width,
    imageHeight: item.image?.height,
    publishedAt: item.publishedAt?.label,
    publishedAtDateTime: item.publishedAt?.iso,
    readingTime: item.readingTime,
    external,
    featured: item.featured,
    linkLabel: external ? labels.viewExternal : labels.read,
  };
}

export function mapContentToHighlight(
  item: PortfolioContentItem,
  locale: PortfolioLocale,
  linkLabel: string,
): GhContentHighlightData | undefined {
  const href = resolveContentHref(item, locale);
  if (!href) {
    return undefined;
  }

  return {
    type: mapHighlightType(item.type),
    eyebrow: item.categoryLabel,
    title: item.title,
    description: item.excerpt,
    href,
    linkLabel,
    external: item.source.type === 'external',
    imageSrc: item.image?.src,
    imageAlt: item.image?.alt,
    tags: item.tags,
  };
}
