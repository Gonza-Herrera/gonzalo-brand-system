import { EN_CONTENT_HUB_CONTENT } from '../en/content-hub.content';
import type { PortfolioContentItem } from '../models/content-hub-content.model';
import { mapContentToArticleCard, mapContentToHighlight } from './article-card.mapper';

describe('Content Article Card mapping', () => {
  const labels = EN_CONTENT_HUB_CONTENT.grid.cardLabels;
  const article = EN_CONTENT_HUB_CONTENT.items[0];

  it('maps internal editorial content and its localized route without mutation', () => {
    const snapshot = JSON.stringify(article);

    expect(mapContentToArticleCard(article, 'es', labels)).toEqual({
      title: 'Angular 14 vs Angular 20: an architecture review',
      href: '/es/content/angular-14-vs-angular-20',
      excerpt:
        'A practical migration perspective on moving from module-heavy Angular applications toward standalone, signal-driven and SSR-ready architecture.',
      type: 'Article',
      category: 'Angular',
      tags: ['Angular', 'Standalone Components', 'Signals', 'SSR'],
      imageSrc: undefined,
      imageAlt: undefined,
      imageWidth: undefined,
      imageHeight: undefined,
      publishedAt: undefined,
      publishedAtDateTime: undefined,
      readingTime: undefined,
      external: false,
      featured: false,
      linkLabel: 'Read content',
    });
    expect(JSON.stringify(article)).toBe(snapshot);
  });

  it('maps optional verified metadata, media and a safe external destination', () => {
    const external: PortfolioContentItem = {
      ...article,
      source: { type: 'external', platform: 'other', url: 'https://angular.dev' },
      detailAvailable: false,
      publishedAt: { iso: '2026-07-10', label: 'July 10, 2026' },
      readingTime: '5 min read',
      image: { src: '/content/article.svg', alt: 'Architecture diagram', width: 1200, height: 675 },
    };

    expect(mapContentToArticleCard(external, 'en', labels)).toMatchObject({
      href: 'https://angular.dev',
      external: true,
      publishedAt: 'July 10, 2026',
      publishedAtDateTime: '2026-07-10',
      readingTime: '5 min read',
      imageWidth: 1200,
      imageHeight: 675,
      linkLabel: 'View original publication',
    });
  });

  it('does not create an internal link when detail is unavailable', () => {
    expect(mapContentToArticleCard(EN_CONTENT_HUB_CONTENT.items[3], 'en', labels)).toBeUndefined();
  });

  it('maps the featured item to Content Highlight without duplicating routing logic', () => {
    const item = EN_CONTENT_HUB_CONTENT.items[2];

    expect(mapContentToHighlight(item, 'en', 'Read the guide')).toMatchObject({
      type: 'resource',
      eyebrow: 'AI Engineering',
      title: 'Beyond chat: building AI agents that do real work',
      href: '/en/content/building-ai-agents',
      linkLabel: 'Read the guide',
      external: false,
    });
  });
});
