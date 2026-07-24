import {
  PORTFOLIO_ABOUT_HERO_FOCUS_IDS,
  PORTFOLIO_AI_USE_CASE_IDS,
  PORTFOLIO_LEADERSHIP_PRACTICE_IDS,
  PORTFOLIO_PHILOSOPHY_IDS,
  PORTFOLIO_PRINCIPLE_IDS,
  PORTFOLIO_STORY_HIGHLIGHT_IDS,
  PORTFOLIO_TECHNICAL_GROUP_IDS,
  PORTFOLIO_WORKING_STYLE_IDS,
} from './models/about-content.model';
import { PORTFOLIO_CONTENT } from './portfolio-content.registry';

describe('About localized content', () => {
  const en = PORTFOLIO_CONTENT.en.pages.about;
  const es = PORTFOLIO_CONTENT.es.pages.about;

  it('keeps all required sections and stable IDs aligned between locales', () => {
    const idCases = [
      [en.hero.focuses, es.hero.focuses, PORTFOLIO_ABOUT_HERO_FOCUS_IDS],
      [en.story.highlights, es.story.highlights, PORTFOLIO_STORY_HIGHLIGHT_IDS],
      [en.philosophy.items, es.philosophy.items, PORTFOLIO_PHILOSOPHY_IDS],
      [en.leadership.practices, es.leadership.practices, PORTFOLIO_LEADERSHIP_PRACTICE_IDS],
      [en.aiEngineering.useCases, es.aiEngineering.useCases, PORTFOLIO_AI_USE_CASE_IDS],
      [en.principles.items, es.principles.items, PORTFOLIO_PRINCIPLE_IDS],
      [en.technicalFocus.groups, es.technicalFocus.groups, PORTFOLIO_TECHNICAL_GROUP_IDS],
      [en.workingStyle.items, es.workingStyle.items, PORTFOLIO_WORKING_STYLE_IDS],
    ] as const;

    for (const [englishItems, spanishItems, expectedIds] of idCases) {
      const englishIds = englishItems.map((item) => item.id);
      const spanishIds = spanishItems.map((item) => item.id);
      expect(englishIds).toEqual(expectedIds);
      expect(spanishIds).toEqual(expectedIds);
      expect(new Set(englishIds).size).toBe(englishIds.length);
      expect(new Set(spanishIds).size).toBe(spanishIds.length);
    }
  });

  it('keeps paragraph and action structures equivalent', () => {
    expect(es.story.paragraphs).toHaveLength(en.story.paragraphs.length);
    expect(es.leadership.paragraphs).toHaveLength(en.leadership.paragraphs.length);
    expect(es.contact.actions.map((action) => action.pageId)).toEqual(
      en.contact.actions.map((action) => action.pageId),
    );
    expect(en.story.experienceAction.pageId).toBe('experience');
    expect(es.story.experienceAction.pageId).toBe('experience');
  });

  it('contains no empty required values, placeholder URLs, percentages or PR copy', () => {
    for (const about of [en, es]) {
      const serialized = JSON.stringify(about);
      expect(serialized).not.toContain('example.com');
      expect(serialized).not.toMatch(/\b\d{1,3}%/);
      expect(serialized).not.toMatch(/PR 13|placeholder/i);
      expect(about.metaTitle.trim().length).toBeGreaterThan(0);
      expect(about.metaDescription.trim().length).toBeGreaterThan(0);

      const featureItems = [
        ...about.philosophy.items,
        ...about.leadership.practices,
        ...about.aiEngineering.useCases,
        ...about.principles.items,
        ...about.workingStyle.items,
      ];
      expect(
        featureItems.every(
          (item) => item.title.trim().length > 0 && item.description.trim().length > 0,
        ),
      ).toBe(true);
      expect(
        about.technicalFocus.groups.every(
          (group) =>
            group.title.trim().length > 0 &&
            group.items.length > 0 &&
            group.items.every((item) => item.trim().length > 0),
        ),
      ).toBe(true);
    }
  });

  it('does not repeat technologies within a locale', () => {
    for (const about of [en, es]) {
      const technologies = about.technicalFocus.groups.flatMap((group) => group.items);
      const normalized = technologies.map((item) => item.toLocaleLowerCase());
      expect(new Set(normalized).size).toBe(normalized.length);
    }
  });
});
