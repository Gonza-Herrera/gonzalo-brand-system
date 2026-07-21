import { EN_CONTENT_HUB_CONTENT } from '../en/content-hub.content';
import type { PortfolioContentItem } from '../models/content-hub-content.model';
import {
  createLocalizedContentPath,
  filterContent,
  findContentBySlug,
  selectFeaturedContent,
  selectPublishedCategories,
  selectPublishedContent,
  selectRelatedContent,
} from './content-selectors';

describe('content selectors', () => {
  const items = EN_CONTENT_HUB_CONTENT.items;

  it('creates stable localized content paths', () => {
    expect(createLocalizedContentPath('en', 'angular-14-vs-angular-20')).toBe(
      '/en/content/angular-14-vs-angular-20',
    );
    expect(createLocalizedContentPath('es', 'building-ai-agents')).toBe(
      '/es/content/building-ai-agents',
    );
  });

  it('selects only published content in editorial order without mutation', () => {
    const input = [...items].reverse();
    const snapshot = input.map((item) => item.id);

    expect(selectPublishedContent(input).map((item) => item.id)).toEqual([
      'angular-14-vs-angular-20',
      'lessons-from-code-reviews',
      'building-ai-agents',
    ]);
    expect(input.map((item) => item.id)).toEqual(snapshot);
  });

  it('selects the first published featured item and handles its absence', () => {
    expect(selectFeaturedContent(items)?.id).toBe('building-ai-agents');
    expect(
      selectFeaturedContent(items.map((item) => ({ ...item, featured: false }))),
    ).toBeUndefined();
  });

  it('filters published content by category without mutating the source', () => {
    const snapshot = JSON.stringify(items);

    expect(filterContent(items, 'all')).toHaveLength(3);
    expect(filterContent(items, 'angular').map((item) => item.id)).toEqual([
      'angular-14-vs-angular-20',
    ]);
    expect(filterContent(items, 'technical-leadership').map((item) => item.id)).toEqual([
      'lessons-from-code-reviews',
    ]);
    expect(filterContent(items, 'developer-experience')).toEqual([]);
    expect(filterContent([], 'all')).toEqual([]);
    expect(JSON.stringify(items)).toBe(snapshot);
  });

  it('derives only categories that contain published items', () => {
    expect(selectPublishedCategories(items)).toEqual([
      'angular',
      'technical-leadership',
      'ai-engineering',
    ]);
  });

  it('resolves only published internal details by slug', () => {
    expect(findContentBySlug(items, 'angular-14-vs-angular-20')?.id).toBe(
      'angular-14-vs-angular-20',
    );
    expect(findContentBySlug(items, 'signals-forms-vs-reactive-forms')).toBeUndefined();
    expect(findContentBySlug(items, 'unknown')).toBeUndefined();
  });

  it('selects explicit and inferred related content deterministically without mutation', () => {
    const current = items[0];
    const snapshot = JSON.stringify(items);
    const related = selectRelatedContent(current, items, 3, [
      'lessons-from-code-reviews',
      'building-ai-agents',
    ]);

    expect(related.map((item) => item.id)).toEqual([
      'lessons-from-code-reviews',
      'building-ai-agents',
    ]);
    expect(related.map((item) => item.id)).not.toContain(current.id);
    expect(selectRelatedContent(current, items, 0)).toEqual([]);
    expect(JSON.stringify(items)).toBe(snapshot);
  });

  it('never includes unpublished content in related results', () => {
    const draft: PortfolioContentItem = {
      ...items[1],
      id: 'signals-forms-vs-reactive-forms',
      slug: 'signals-forms-vs-reactive-forms',
      status: 'draft',
      statusLabel: 'Draft',
      detailAvailable: true,
    };

    expect(selectRelatedContent(items[0], [items[0], draft], 3, [draft.id])).toEqual([]);
  });
});
