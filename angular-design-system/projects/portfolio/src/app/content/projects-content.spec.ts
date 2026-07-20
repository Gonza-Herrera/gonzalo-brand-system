import { GH_PROJECT_STATUSES } from 'gh-design-system';

import { EN_PROJECTS_CONTENT } from './en/projects.content';
import { ES_PROJECTS_CONTENT } from './es/projects.content';
import {
  PORTFOLIO_PROJECT_CATEGORIES,
  PORTFOLIO_PROJECT_IDS,
  PORTFOLIO_PROJECT_SLUGS,
  type PortfolioProjectContent,
} from './models/projects-content.model';

describe('Portfolio projects content', () => {
  const locales = [EN_PROJECTS_CONTENT, ES_PROJECTS_CONTENT] as const;

  it('keeps stable IDs, slugs, order and case-study availability aligned', () => {
    for (const content of locales) {
      expect(content.items.map((project) => project.id)).toEqual(PORTFOLIO_PROJECT_IDS);
      expect(content.items.map((project) => project.slug)).toEqual(PORTFOLIO_PROJECT_SLUGS);
      expect(content.items.map((project) => project.order)).toEqual([1, 2, 3, 4]);
      expect(
        content.items.filter((project) => project.featured).map((project) => project.id),
      ).toEqual(['angular-design-system']);
      expect(
        content.items.filter((project) => project.caseStudy.available).map((project) => project.id),
      ).toEqual(['angular-design-system']);
    }
  });

  it('uses valid statuses, categories and complete required text', () => {
    for (const content of locales) {
      expect(content.metaTitle.length).toBeGreaterThan(0);
      expect(content.metaDescription.length).toBeGreaterThan(0);
      expect(new Set(content.items.map((project) => project.id)).size).toBe(content.items.length);
      expect(new Set(content.items.map((project) => project.slug)).size).toBe(content.items.length);

      for (const project of content.items) {
        expect(project.title.trim().length).toBeGreaterThan(0);
        expect(project.shortDescription.trim().length).toBeGreaterThan(0);
        expect(project.statusLabel.trim().length).toBeGreaterThan(0);
        expect(GH_PROJECT_STATUSES).toContain(project.status);
        expect(PORTFOLIO_PROJECT_CATEGORIES).toContain(project.category);
        expect(project.technologies.every((technology) => technology.trim().length > 0)).toBe(true);
        expect(JSON.stringify(project)).not.toContain('example.com');
      }
    }
  });

  it('keeps the complete case-study structure and stable nested IDs in parity', () => {
    const english = EN_PROJECTS_CONTENT.items[0].caseStudy;
    const spanish = ES_PROJECTS_CONTENT.items[0].caseStudy;

    expect(english.available).toBe(true);
    expect(spanish.available).toBe(true);
    if (!english.available || !spanish.available) {
      throw new Error('Angular Design System must have a localized case study.');
    }

    expect([
      english.context.id,
      english.problem.id,
      english.goals.id,
      english.constraints.id,
      english.role.id,
      english.approach.id,
      english.architecture.id,
      english.decisions.id,
      english.implementation.id,
      english.challenges.id,
      english.results.id,
      english.lessons.id,
      english.nextSteps.id,
    ]).toEqual([
      spanish.context.id,
      spanish.problem.id,
      spanish.goals.id,
      spanish.constraints.id,
      spanish.role.id,
      spanish.approach.id,
      spanish.architecture.id,
      spanish.decisions.id,
      spanish.implementation.id,
      spanish.challenges.id,
      spanish.results.id,
      spanish.lessons.id,
      spanish.nextSteps.id,
    ]);
    expect(english.decisions.items.map((item) => item.id)).toEqual(
      spanish.decisions.items.map((item) => item.id),
    );
    expect(english.implementation.phases.map((item) => item.id)).toEqual(
      spanish.implementation.phases.map((item) => item.id),
    );
    expect(english.challenges.items.map((item) => item.id)).toEqual(
      spanish.challenges.items.map((item) => item.id),
    );
    expect(english.results.items.map((item) => item.id)).toEqual(
      spanish.results.items.map((item) => item.id),
    );
  });

  it('contains no external URLs or image assets without an approved source', () => {
    for (const content of locales) {
      const projects: readonly PortfolioProjectContent[] = content.items;
      expect(projects.every((project) => !project.links?.length)).toBe(true);
      expect(projects.every((project) => !project.image)).toBe(true);
      expect(JSON.stringify(content)).not.toMatch(/https?:\/\//);
    }
  });
});
