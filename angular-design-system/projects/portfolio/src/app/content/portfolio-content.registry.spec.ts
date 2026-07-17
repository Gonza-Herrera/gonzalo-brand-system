import { PORTFOLIO_CONTENT, getPortfolioContent } from './portfolio-content.registry';
import { PORTFOLIO_NAVIGATION_PAGE_IDS, PORTFOLIO_PAGE_IDS } from './models/page-content.model';
import { PORTFOLIO_LOCALES } from './models/portfolio-locale.type';

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
        expect(page.title.length).toBeGreaterThan(0);
        expect(page.metaTitle.length).toBeGreaterThan(0);
        expect(page.metaDescription.length).toBeGreaterThan(0);
      }
    }

    expect(PORTFOLIO_CONTENT.en.pages.about.title).not.toBe(PORTFOLIO_CONTENT.es.pages.about.title);
  });
});
