import { SEO_CONFIG_VALUE } from './seo.config';
import { getSeoPageDefinition } from './seo.registry';
import {
  buildAbsoluteUrl,
  buildAlternateLinks,
  buildLocalizedPath,
  buildSeoViewModel,
  normalizeBaseUrl,
  normalizePublicPath,
  normalizeRoutePath,
  serializeJsonLd,
  switchPathLocale,
} from './seo.utils';

describe('SEO utilities', () => {
  it('normalizes deployment URLs and rejects unsafe canonical configuration', () => {
    expect(normalizeBaseUrl('https://portfolio.example')).toBe('https://portfolio.example');
    expect(() => normalizeBaseUrl('http://portfolio.example')).toThrow(/HTTPS/u);
    expect(() => normalizeBaseUrl('https://portfolio.example/subpath')).toThrow(/origin/u);
    expect(() => normalizeBaseUrl('https://portfolio.example?preview=true')).toThrow(/origin/u);
    expect(normalizePublicPath('assets/social/preview.jpg')).toBe('/assets/social/preview.jpg');
    expect(() => normalizePublicPath('/preview.jpg?size=large')).toThrow(/query/u);
  });

  it('builds normalized absolute and localized URLs without queries or fragments', () => {
    expect(normalizeRoutePath('/es/about/?campaign=test#bio')).toBe('/es/about');
    expect(buildAbsoluteUrl('https://portfolio.example', '/es/about?campaign=test')).toBe(
      'https://portfolio.example/es/about',
    );
    expect(buildLocalizedPath('en', '')).toBe('/en');
    expect(buildLocalizedPath('es', 'projects')).toBe('/es/projects');
    expect(switchPathLocale('/en/projects/angular-design-system', 'es')).toBe(
      '/es/projects/angular-design-system',
    );
  });

  it('creates EN, ES and x-default alternates for the same conceptual page', () => {
    expect(buildAlternateLinks(SEO_CONFIG_VALUE, '/es/about')).toEqual([
      { hreflang: 'en', href: 'https://portfolio.example/en/about' },
      { hreflang: 'es', href: 'https://portfolio.example/es/about' },
      { hreflang: 'x-default', href: 'https://portfolio.example/en/about' },
    ]);
  });

  it('builds complete localized metadata with an absolute image fallback', () => {
    const viewModel = buildSeoViewModel(SEO_CONFIG_VALUE, getSeoPageDefinition('about'), {
      pageId: 'about',
      locale: 'es',
    });

    expect(viewModel.title).toBe('Sobre mí | Gonzalo Herrera');
    expect(viewModel.canonicalUrl).toBe('https://portfolio.example/es/about');
    expect(viewModel.openGraph.url).toBe(viewModel.canonicalUrl);
    expect(viewModel.openGraph.image).toBe(
      'https://portfolio.example/assets/social/gonzalo-herrera-og.jpg',
    );
    expect(viewModel.openGraph.locale).toBe('es_AR');
    expect(viewModel.openGraph.alternateLocales).toEqual(['en_US']);
    expect(viewModel.twitter.card).toBe('summary_large_image');
  });

  it('omits canonical and alternate links for non-indexable pages', () => {
    const viewModel = buildSeoViewModel(SEO_CONFIG_VALUE, getSeoPageDefinition('not-found'), {
      pageId: 'not-found',
      locale: 'en',
      path: '/en/does-not-exist',
    });

    expect(viewModel.robots).toBe('noindex, nofollow');
    expect(viewModel.canonicalUrl).toBeUndefined();
    expect(viewModel.openGraph.url).toBeUndefined();
    expect(viewModel.alternateLinks).toEqual([]);
  });

  it('serializes controlled JSON-LD without allowing a closing script sequence', () => {
    const serialized = serializeJsonLd({ value: '</script><script>alert(1)</script>' });
    expect(serialized).not.toContain('<');
    expect(JSON.parse(serialized)).toEqual({ value: '</script><script>alert(1)</script>' });
  });
});
