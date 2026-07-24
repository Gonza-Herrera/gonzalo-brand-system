import { PORTFOLIO_PAGE_IDS, PORTFOLIO_PAGE_PATHS } from '../../content/models/page-content.model';
import { PORTFOLIO_LOCALES } from '../../content/models/portfolio-locale.type';
import runtimeSeoConfig from '../../../../seo.config.json';
import { SEO_PAGE_REGISTRY } from './seo.registry';

describe('SEO page registry', () => {
  it('provides structurally equivalent localized metadata for every stable page ID', () => {
    expect(Object.keys(SEO_PAGE_REGISTRY)).toEqual([...PORTFOLIO_PAGE_IDS]);

    for (const pageId of PORTFOLIO_PAGE_IDS) {
      const definition = SEO_PAGE_REGISTRY[pageId];
      expect(definition.id).toBe(pageId);
      expect(Object.keys(definition.metadata)).toEqual([...PORTFOLIO_LOCALES]);
      for (const locale of PORTFOLIO_LOCALES) {
        expect(definition.metadata[locale].title.trim().length).toBeGreaterThan(0);
        expect(definition.metadata[locale].description.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('maps the six base pages and approved details to indexable route segments', () => {
    for (const [pageId, routeSegment] of Object.entries(PORTFOLIO_PAGE_PATHS)) {
      expect(SEO_PAGE_REGISTRY[pageId as keyof typeof PORTFOLIO_PAGE_PATHS]).toMatchObject({
        routeSegment,
        indexable: true,
      });
    }
    expect(SEO_PAGE_REGISTRY['not-found']).toMatchObject({
      routeSegment: '',
      indexable: false,
    });
    expect(runtimeSeoConfig.supportedLocales).toEqual([...PORTFOLIO_LOCALES]);
    expect(runtimeSeoConfig.indexableRouteSegments).toEqual(
      expect.arrayContaining([
        ...Object.values(PORTFOLIO_PAGE_PATHS),
        'projects/angular-design-system',
        'content/angular-14-vs-angular-20',
        'content/lessons-from-code-reviews',
        'content/building-ai-agents',
      ]),
    );
    expect(runtimeSeoConfig.indexableRouteSegments).not.toContain(
      'content/signals-forms-vs-reactive-forms',
    );
  });

  it('contains the approved localized Home and Not Found metadata', () => {
    expect(SEO_PAGE_REGISTRY.home.metadata.en.title).toBe(
      'Gonzalo Herrera | Frontend Tech Lead & AI-Augmented Engineer',
    );
    expect(SEO_PAGE_REGISTRY.home.metadata.es.title).toBe(
      'Gonzalo Herrera | Frontend Tech Lead e Ingeniero Aumentado por IA',
    );
    expect(SEO_PAGE_REGISTRY['not-found'].metadata.en.robots).toBe('noindex, nofollow');
    expect(SEO_PAGE_REGISTRY['not-found'].metadata.es.description).toContain(
      'Regresa al portfolio de Gonzalo Herrera',
    );
  });
});
