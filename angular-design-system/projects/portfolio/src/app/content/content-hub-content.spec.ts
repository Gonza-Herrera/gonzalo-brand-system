import { EN_CONTENT_DETAILS } from './en/content-details.content';
import { ES_CONTENT_DETAILS } from './es/content-details.content';
import {
  PORTFOLIO_CONTENT_CATEGORIES,
  PORTFOLIO_CONTENT_IDS,
  PORTFOLIO_CONTENT_STATUSES,
  PORTFOLIO_CONTENT_TYPES,
  type PortfolioContentItem,
} from './models/content-hub-content.model';
import { PORTFOLIO_CONTENT } from './portfolio-content.registry';

describe('Portfolio Content Hub content', () => {
  const en = PORTFOLIO_CONTENT.en.pages.content;
  const es = PORTFOLIO_CONTENT.es.pages.content;

  it('keeps stable IDs, slugs, structure and publishing state in EN/ES parity', () => {
    expect(en.items.map((item) => item.id)).toEqual(PORTFOLIO_CONTENT_IDS);
    expect(es.items.map((item) => item.id)).toEqual(PORTFOLIO_CONTENT_IDS);
    expect(en.items.map((item) => item.slug)).toEqual(es.items.map((item) => item.slug));
    expect(en.items.map((item) => item.type)).toEqual(es.items.map((item) => item.type));
    expect(en.items.map((item) => item.category)).toEqual(es.items.map((item) => item.category));
    expect(en.items.map((item) => item.status)).toEqual(es.items.map((item) => item.status));
    expect(en.items.map((item) => item.detailAvailable)).toEqual(
      es.items.map((item) => item.detailAvailable),
    );
    expect(new Set(en.items.map((item) => item.id)).size).toBe(en.items.length);
    expect(new Set(en.items.map((item) => item.slug)).size).toBe(en.items.length);
  });

  it('uses only closed types, categories and statuses with complete editorial fields', () => {
    for (const hub of [en, es]) {
      for (const item of hub.items) {
        expect(PORTFOLIO_CONTENT_TYPES).toContain(item.type);
        expect(PORTFOLIO_CONTENT_CATEGORIES).toContain(item.category);
        expect(PORTFOLIO_CONTENT_STATUSES).toContain(item.status);
        expect(item.title.trim().length).toBeGreaterThan(0);
        expect(item.excerpt.trim().length).toBeGreaterThan(0);
        expect(item.tags.length).toBeGreaterThan(0);
        expect(item.tags.every((tag) => tag.trim().length > 0)).toBe(true);
      }
      expect(hub.items.filter((item) => item.status === 'published')).toHaveLength(3);
      expect(hub.items.filter((item) => item.featured && item.status === 'published')).toHaveLength(
        1,
      );
      expect(JSON.stringify(hub)).not.toContain('example.com');
    }
  });

  it('publishes only records with a real external URL or a complete internal detail', () => {
    const publishedItems: readonly PortfolioContentItem[] = en.items.filter(
      (candidate) => candidate.status === 'published',
    );

    for (const item of publishedItems) {
      if (item.source.type === 'external') {
        expect(item.source.url).toMatch(/^https:\/\//);
        expect(item.source.url).not.toContain('example.com');
      } else {
        expect(item.detailAvailable).toBe(true);
        expect(EN_CONTENT_DETAILS[item.id]).toBeDefined();
      }
    }
  });

  it('keeps internal detail sections and related IDs in bilingual parity', () => {
    for (const id of PORTFOLIO_CONTENT_IDS) {
      const enDetail = EN_CONTENT_DETAILS[id];
      const esDetail = ES_CONTENT_DETAILS[id];
      expect(Boolean(enDetail)).toBe(Boolean(esDetail));

      if (enDetail && esDetail) {
        expect(enDetail.sections.map((section) => section.id)).toEqual(
          esDetail.sections.map((section) => section.id),
        );
        expect(enDetail.sections.map((section) => section.type)).toEqual(
          esDetail.sections.map((section) => section.type),
        );
        expect(enDetail.relatedContentIds).toEqual(esDetail.relatedContentIds);
        expect(
          enDetail.relatedContentIds?.every((relatedId) =>
            PORTFOLIO_CONTENT_IDS.includes(relatedId),
          ),
        ).toBe(true);
      }
    }
  });

  it('keeps Home featured content on the canonical localized registry object', () => {
    expect(PORTFOLIO_CONTENT.en.pages.home.featuredContent.item).toBe(en.items[2]);
    expect(PORTFOLIO_CONTENT.es.pages.home.featuredContent.item).toBe(es.items[2]);
    expect(en.items[2].id).toBe('building-ai-agents');
  });
});
