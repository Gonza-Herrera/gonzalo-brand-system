import type {
  PortfolioContentCategory,
  PortfolioContentFilter,
  PortfolioContentId,
  PortfolioContentItem,
  PortfolioContentSlug,
} from '../models/content-hub-content.model';
import type { PortfolioLocale } from '../models/portfolio-locale.type';

export function createLocalizedContentPath(
  locale: PortfolioLocale,
  slug: PortfolioContentSlug,
): string {
  return `/${locale}/content/${slug}`;
}

export function selectPublishedContent(
  items: readonly PortfolioContentItem[],
): readonly PortfolioContentItem[] {
  return items
    .filter((item) => item.status === 'published')
    .sort((first, second) => first.order - second.order);
}

export function selectFeaturedContent(
  items: readonly PortfolioContentItem[],
): PortfolioContentItem | undefined {
  return selectPublishedContent(items).find((item) => item.featured);
}

export function filterContent(
  items: readonly PortfolioContentItem[],
  filter: PortfolioContentFilter,
): readonly PortfolioContentItem[] {
  const publishedItems = selectPublishedContent(items);

  return filter === 'all'
    ? publishedItems
    : publishedItems.filter((item) => item.category === filter);
}

export function selectPublishedCategories(
  items: readonly PortfolioContentItem[],
): readonly PortfolioContentCategory[] {
  return selectPublishedContent(items)
    .map((item) => item.category)
    .filter((category, index, categories) => categories.indexOf(category) === index);
}

export function findContentBySlug(
  items: readonly PortfolioContentItem[],
  slug: string,
): PortfolioContentItem | undefined {
  return items.find(
    (item) => item.slug === slug && item.status === 'published' && item.detailAvailable,
  );
}

export function selectRelatedContent(
  current: PortfolioContentItem,
  items: readonly PortfolioContentItem[],
  limit = 3,
  relatedContentIds: readonly PortfolioContentId[] = [],
): readonly PortfolioContentItem[] {
  if (limit <= 0) {
    return [];
  }

  const candidates = selectPublishedContent(items).filter(
    (item) => item.id !== current.id && item.detailAvailable,
  );
  const explicit = relatedContentIds
    .map((id) => candidates.find((item) => item.id === id))
    .filter((item): item is PortfolioContentItem => Boolean(item));
  const inferred = candidates.filter(
    (item) =>
      !explicit.some((explicitItem) => explicitItem.id === item.id) &&
      (item.category === current.category || item.tags.some((tag) => current.tags.includes(tag))),
  );

  return [...explicit, ...inferred].slice(0, limit);
}
