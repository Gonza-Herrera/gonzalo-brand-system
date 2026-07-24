import { GH_PROJECT_STATUSES } from 'gh-design-system';

import { PORTFOLIO_CONTENT, getPortfolioContent } from './portfolio-content.registry';
import { getPortfolioContactContent } from './contact-content.registry';
import { PORTFOLIO_EXPERTISE_IDS, PORTFOLIO_HERO_HIGHLIGHT_IDS } from './models/home-content.model';
import {
  PORTFOLIO_CONTACT_CHANNEL_IDS,
  PORTFOLIO_CONTACT_HIGHLIGHT_IDS,
  PORTFOLIO_CONTACT_TOPIC_IDS,
} from './models/contact-content.model';
import type { PortfolioLinkContent } from './models/link-content.model';
import { PORTFOLIO_NAVIGATION_PAGE_IDS, PORTFOLIO_PAGE_IDS } from './models/page-content.model';
import { PORTFOLIO_LOCALES } from './models/portfolio-locale.type';
import { PORTFOLIO_PROJECT_IDS } from './models/projects-content.model';

describe('Portfolio content registry', () => {
  it('keeps English and Spanish structurally complete and aligned', () => {
    for (const locale of PORTFOLIO_LOCALES) {
      const content = getPortfolioContent(locale);

      expect(Object.keys(content.pages).sort()).toEqual([...PORTFOLIO_PAGE_IDS].sort());
      expect(content.shell.navigation.items.map((item) => item.id)).toEqual(
        PORTFOLIO_NAVIGATION_PAGE_IDS,
      );
      expect(content.shell.navigation.items.every((item) => item.label.length > 0)).toBe(true);
      expect(content.shell.accessibility.skipToContent.length).toBeGreaterThan(0);
      expect(content.shell.navigation.openMenuLabel.length).toBeGreaterThan(0);
      expect(content.shell.navigation.closeMenuLabel.length).toBeGreaterThan(0);

      for (const pageId of PORTFOLIO_PAGE_IDS) {
        const page = content.pages[pageId];
        expect(page.metaTitle.length).toBeGreaterThan(0);
        expect(page.metaDescription.length).toBeGreaterThan(0);
      }

      const home = content.pages.home;
      expect(home.hero.title.length).toBeGreaterThan(0);
      expect(home.hero.highlights.map((item) => item.id)).toEqual(PORTFOLIO_HERO_HIGHLIGHT_IDS);
      expect(home.expertise.items.map((item) => item.id)).toEqual(PORTFOLIO_EXPERTISE_IDS);
      expect(content.pages.projects.items.map((item) => item.id)).toEqual(PORTFOLIO_PROJECT_IDS);
      expect(home.selectedProjects.items.map((item) => item.id)).toEqual(['angular-design-system']);
      expect(home.expertise.items).toHaveLength(6);
      expect(home.selectedProjects.items).toHaveLength(1);
      expect(content.pages.projects.items[0]).toMatchObject(home.selectedProjects.items[0]);
      expect(home.experience.items.length).toBeLessThanOrEqual(3);
      expect(home.selectedProjects.items.every((project) => project.statusLabel.length > 0)).toBe(
        true,
      );
      expect(
        home.selectedProjects.items.every((project) =>
          GH_PROJECT_STATUSES.includes(project.status),
        ),
      ).toBe(true);

      const links: readonly PortfolioLinkContent[] = [
        home.hero.primaryAction,
        home.hero.secondaryAction,
        home.selectedProjects.viewAllAction,
        home.experience.viewAllAction,
        ...home.contact.actions,
      ];
      expect(links.every((link) => link.label.length > 0)).toBe(true);
      expect(links.filter((link) => !link.external).every((link) => Boolean(link.pageId))).toBe(
        true,
      );
      expect(JSON.stringify(home)).not.toContain('example.com');
      expect(home.featuredContent.item).toBe(
        content.pages.content.items.find((item) => item.featured && item.status === 'published'),
      );

      const contact = getPortfolioContactContent(locale);
      expect(contact.hero.highlights.map((item) => item.id)).toEqual(
        PORTFOLIO_CONTACT_HIGHLIGHT_IDS,
      );
      expect(contact.topics.items.map((item) => item.id)).toEqual(PORTFOLIO_CONTACT_TOPIC_IDS);
      expect(contact.channels.items.map((item) => item.id)).toEqual(PORTFOLIO_CONTACT_CHANNEL_IDS);
      expect(contact.explore.actions.map((action) => action.pageId)).toEqual([
        'experience',
        'projects',
        'content',
      ]);
      expect(JSON.stringify(contact)).not.toContain('mailto:');
    }

    expect(PORTFOLIO_CONTENT.en.pages.about.hero.title).not.toBe(
      PORTFOLIO_CONTENT.es.pages.about.hero.title,
    );
    expect(PORTFOLIO_CONTENT.en.pages.home.hero.title).not.toBe(
      PORTFOLIO_CONTENT.es.pages.home.hero.title,
    );
    expect(PORTFOLIO_CONTENT.en.pages.home.featuredContent.item.id).toBe(
      PORTFOLIO_CONTENT.es.pages.home.featuredContent.item.id,
    );
  });
});
