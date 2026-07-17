import {
  createInvalidLocaleFallbackUrl,
  createLocalizedPath,
  getPageIdFromUrl,
  switchLocaleInUrl,
} from './portfolio-route.utils';

describe('Portfolio route utilities', () => {
  it('creates canonical localized paths from stable page IDs', () => {
    expect(createLocalizedPath('en', 'home')).toBe('/en');
    expect(createLocalizedPath('es', 'projects')).toBe('/es/projects');
  });

  it('switches locale without duplicating segments and preserves URL details', () => {
    expect(switchLocaleInUrl('es', '/en/projects')).toBe('/es/projects');
    expect(switchLocaleInUrl('en', '/es')).toBe('/en');
    expect(switchLocaleInUrl('es', '/en/content?topic=angular#latest')).toBe(
      '/es/content?topic=angular#latest',
    );
  });

  it('preserves the remaining path when replacing an invalid locale', () => {
    expect(createInvalidLocaleFallbackUrl('en', '/fr/about')).toBe('/en/about');
    expect(createInvalidLocaleFallbackUrl('en', '/pt/projects?view=grid')).toBe(
      '/en/projects?view=grid',
    );
    expect(createInvalidLocaleFallbackUrl('en', '/fr')).toBe('/en');
  });

  it('derives exact active page IDs without marking Home on every route', () => {
    expect(getPageIdFromUrl('/en')).toBe('home');
    expect(getPageIdFromUrl('/es/about')).toBe('about');
    expect(getPageIdFromUrl('/en/projects')).toBe('projects');
    expect(getPageIdFromUrl('/en/projects/unknown')).toBe('not-found');
    expect(getPageIdFromUrl('/es/unknown')).toBe('not-found');
  });
});
