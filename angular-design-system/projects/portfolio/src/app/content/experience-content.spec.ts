import { GH_EXPERIENCE_WORK_MODES } from 'gh-design-system';

import { EN_EXPERIENCE_CONTENT } from './en/experience.content';
import { ES_EXPERIENCE_CONTENT } from './es/experience.content';
import {
  PORTFOLIO_EXPERIENCE_CAPABILITY_GROUP_IDS,
  PORTFOLIO_EXPERIENCE_DIRECTION_IDS,
  PORTFOLIO_EXPERIENCE_HIGHLIGHT_IDS,
  PORTFOLIO_EXPERIENCE_LEADERSHIP_IDS,
  PORTFOLIO_EXPERIENCE_WAY_OF_WORKING_IDS,
} from './models/experience-content.model';
import { selectFeaturedExperiences } from './utils/experience-card.mapper';
import { EN_HOME_CONTENT } from './en/home.content';
import { ES_HOME_CONTENT } from './es/home.content';

describe('Experience localized content', () => {
  const en = EN_EXPERIENCE_CONTENT;
  const es = ES_EXPERIENCE_CONTENT;

  it('keeps stable editorial IDs and order aligned between locales', () => {
    const cases = [
      [en.hero.highlights, es.hero.highlights, PORTFOLIO_EXPERIENCE_HIGHLIGHT_IDS],
      [en.leadership.items, es.leadership.items, PORTFOLIO_EXPERIENCE_LEADERSHIP_IDS],
      [en.waysOfWorking.items, es.waysOfWorking.items, PORTFOLIO_EXPERIENCE_WAY_OF_WORKING_IDS],
      [en.capabilities.groups, es.capabilities.groups, PORTFOLIO_EXPERIENCE_CAPABILITY_GROUP_IDS],
      [en.careerDirection.points, es.careerDirection.points, PORTFOLIO_EXPERIENCE_DIRECTION_IDS],
    ] as const;

    for (const [englishItems, spanishItems, expectedIds] of cases) {
      const englishIds = englishItems.map((item) => item.id);
      const spanishIds = spanishItems.map((item) => item.id);
      expect(englishIds).toEqual(expectedIds);
      expect(spanishIds).toEqual(expectedIds);
      expect(new Set(englishIds).size).toBe(englishIds.length);
    }

    expect(en.timeline.items.map((item) => item.id)).toEqual(
      es.timeline.items.map((item) => item.id),
    );
    expect(es.summary.paragraphs).toHaveLength(en.summary.paragraphs.length);
    expect(es.summary.focusAreas).toHaveLength(en.summary.focusAreas.length);
  });

  it('validates every configured professional record without inventing required values', () => {
    for (const content of [en, es]) {
      const ids = content.timeline.items.map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);

      for (const item of content.timeline.items) {
        expect(item.id.trim().length).toBeGreaterThan(0);
        expect(item.role.trim().length).toBeGreaterThan(0);
        expect(item.company.trim().length).toBeGreaterThan(0);
        expect(item.startDate.trim().length).toBeGreaterThan(0);
        expect(item.summary.trim().length).toBeGreaterThan(0);
        expect(item.responsibilities.length).toBeGreaterThan(0);
        expect(item.responsibilities.every((value) => value.trim().length > 0)).toBe(true);
        expect(item.technologies?.every((value) => value.trim().length > 0) ?? true).toBe(true);
        expect(item.workMode ? GH_EXPERIENCE_WORK_MODES.includes(item.workMode) : true).toBe(true);
      }
    }
  });

  it('contains complete non-placeholder sections, valid links and no fabricated metrics', () => {
    for (const content of [en, es]) {
      expect(content.timeline.verificationNotice.trim().length).toBeGreaterThan(0);
      expect(content.leadership.items.every((item) => item.title && item.description)).toBe(true);
      expect(content.waysOfWorking.items.every((item) => item.title && item.description)).toBe(
        true,
      );
      expect(content.capabilities.groups.every((group) => group.items.length > 0)).toBe(true);
      expect(content.contact.actions.map((action) => action.pageId)).toEqual([
        'contact',
        'projects',
      ]);
      expect(content.careerDirection.projectsAction.pageId).toBe('projects');

      const serialized = JSON.stringify(content);
      expect(serialized).not.toContain('example.com');
      expect(serialized).not.toMatch(/Company Name|Empresa de ejemplo|2020.?Present/i);
      expect(serialized).not.toMatch(/\b\d{1,3}%/);
      expect(serialized).not.toMatch(/PR 14|placeholder/i);
    }
  });

  it('keeps capabilities non-empty and unique inside each group', () => {
    for (const content of [en, es]) {
      for (const group of content.capabilities.groups) {
        const normalized = group.items.map((item) => item.toLocaleLowerCase());
        expect(new Set(normalized).size).toBe(normalized.length);
      }
    }
  });

  it('derives Home previews from the canonical Experience collections', () => {
    const cases = [
      [EN_HOME_CONTENT, EN_EXPERIENCE_CONTENT],
      [ES_HOME_CONTENT, ES_EXPERIENCE_CONTENT],
    ] as const;

    for (const [home, experience] of cases) {
      const expectedIds = selectFeaturedExperiences(experience.timeline.items).map(
        (item) => item.id,
      );
      expect(home.experience.items.map((item) => item.id)).toEqual(expectedIds);
      expect(
        home.experience.items.every((item) =>
          experience.timeline.items.some((experienceItem) => experienceItem.id === item.id),
        ),
      ).toBe(true);
    }
  });
});
