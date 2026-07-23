import { GH_EXPERIENCE_WORK_MODES } from 'gh-design-system';

import { EN_EXPERIENCE_CONTENT } from './en/experience.content';
import { EN_HOME_CONTENT } from './en/home.content';
import { ES_EXPERIENCE_CONTENT } from './es/experience.content';
import { ES_HOME_CONTENT } from './es/home.content';
import {
  PORTFOLIO_EXPERIENCE_CAPABILITY_GROUP_IDS,
  PORTFOLIO_EXPERIENCE_DIRECTION_IDS,
  PORTFOLIO_EXPERIENCE_HIGHLIGHT_IDS,
  PORTFOLIO_EXPERIENCE_LEADERSHIP_IDS,
  PORTFOLIO_EXPERIENCE_WAY_OF_WORKING_IDS,
  PORTFOLIO_PROFESSIONAL_EXPERIENCE_IDS,
} from './models/experience-content.model';
import { selectCurrentExperience, selectExperiencePreview } from './utils/experience-selectors';

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

    expect(en.timeline.items.map((item) => item.id)).toEqual(PORTFOLIO_PROFESSIONAL_EXPERIENCE_IDS);
    expect(es.timeline.items.map((item) => item.id)).toEqual(PORTFOLIO_PROFESSIONAL_EXPERIENCE_IDS);
    expect(en.timeline.items.map((item) => item.order)).toEqual([1, 2, 3, 4, 5]);
    expect(es.timeline.items.map((item) => item.order)).toEqual([1, 2, 3, 4, 5]);
    expect(es.summary.paragraphs).toHaveLength(en.summary.paragraphs.length);
    expect(es.summary.focusAreas).toHaveLength(en.summary.focusAreas.length);
  });

  it('contains five complete professional records in each locale', () => {
    for (const content of [en, es]) {
      expect(content.timeline.items).toHaveLength(5);

      const ids = content.timeline.items.map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);

      for (const item of content.timeline.items) {
        expect(item.id.trim().length).toBeGreaterThan(0);
        expect(item.role.trim().length).toBeGreaterThan(0);
        expect(item.company.trim().length).toBeGreaterThan(0);
        expect(item.startDate.trim().length).toBeGreaterThan(0);
        expect(item.endDate?.trim().length).toBeGreaterThan(0);
        expect(item.summary.length).toBeGreaterThan(0);
        expect(item.summary.every((paragraph) => paragraph.trim().length > 0)).toBe(true);
        expect(item.responsibilities.length).toBeGreaterThan(0);
        expect(item.responsibilities.every((value) => value.trim().length > 0)).toBe(true);
        expect(item.technologies?.every((value) => value.trim().length > 0) ?? true).toBe(true);
        expect(item.capabilities?.every((value) => value.trim().length > 0) ?? true).toBe(true);
        expect((item.technologies?.length ?? 0) + (item.capabilities?.length ?? 0)).toBeGreaterThan(
          0,
        );
        expect(item.workMode ? GH_EXPERIENCE_WORK_MODES.includes(item.workMode) : true).toBe(true);
      }
    }
  });

  it('keeps professional facts and structure equivalent across English and Spanish', () => {
    for (const [index, english] of en.timeline.items.entries()) {
      const spanish = es.timeline.items[index]!;

      expect(spanish.id).toBe(english.id);
      expect(spanish.order).toBe(english.order);
      expect(spanish.role).toBe(english.role);
      expect(spanish.current).toBe(english.current);
      expect(spanish.summary).toHaveLength(english.summary.length);
      expect(spanish.responsibilities).toHaveLength(english.responsibilities.length);
      expect(spanish.technologies ?? []).toEqual(english.technologies ?? []);
      expect(spanish.capabilities ?? []).toHaveLength(english.capabilities?.length ?? 0);
      expect(Boolean(spanish.logo)).toBe(Boolean(english.logo));
      expect(Boolean(spanish.workMode)).toBe(Boolean(english.workMode));
    }

    expect(en.timeline.items.map((item) => item.company)).toEqual([
      'ICBC Bank',
      'Endava',
      'Vortex',
      'Develative',
      'Develative',
    ]);
    expect(es.timeline.items.map((item) => item.company)).toEqual([
      'Banco ICBC',
      'Endava',
      'Vortex',
      'Develative',
      'Develative',
    ]);
  });

  it('marks only ICBC as the current experience', () => {
    for (const content of [en, es]) {
      expect(content.timeline.items.filter((item) => item.current)).toHaveLength(1);
      expect(selectCurrentExperience(content.timeline.items)?.id).toBe('icbc-frontend-developer');
    }

    expect(en.timeline.labels.current).toBe('Current');
    expect(es.timeline.labels.current).toBe('Actualidad');
  });

  it('contains no provisional source notice, fabricated metrics or placeholder URLs', () => {
    for (const content of [en, es]) {
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
      expect(serialized).not.toMatch(
        /Company, role and date|Los datos de empresas|approved repository source|fuente aprobada del repositorio|PR 14|placeholder/i,
      );
    }
  });

  it('keeps capabilities non-empty and unique inside each page capability group', () => {
    for (const content of [en, es]) {
      for (const group of content.capabilities.groups) {
        const normalized = group.items.map((item) => item.toLocaleLowerCase());
        expect(new Set(normalized).size).toBe(normalized.length);
      }
    }
  });

  it('derives the three-entry Home previews from the canonical Experience collections', () => {
    const cases = [
      [EN_HOME_CONTENT, EN_EXPERIENCE_CONTENT],
      [ES_HOME_CONTENT, ES_EXPERIENCE_CONTENT],
    ] as const;

    for (const [home, experience] of cases) {
      const expected = selectExperiencePreview(experience.timeline.items);

      expect(home.experience.items).toHaveLength(3);
      expect(home.experience.items.map((item) => item.id)).toEqual(expected.map((item) => item.id));

      for (const [index, preview] of home.experience.items.entries()) {
        const source = expected[index]!;
        expect(preview.company).toBe(source.company);
        expect(preview.role).toBe(source.role);
        expect(preview.startDate).toBe(source.startDate);
        expect(preview.endDate).toBe(source.endDate);
        expect(preview.current).toBe(source.current);
      }
    }
  });
});
