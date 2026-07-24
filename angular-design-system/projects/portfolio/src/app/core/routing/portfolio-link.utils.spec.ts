import type { PortfolioLinkContent } from '../../content/models/link-content.model';
import { resolvePortfolioAction, resolvePortfolioHref } from './portfolio-link.utils';

describe('Portfolio link utilities', () => {
  it('creates locale-aware internal links from page IDs', () => {
    const link = { label: 'Projects', pageId: 'projects' } satisfies PortfolioLinkContent;

    expect(resolvePortfolioHref('en', link)).toBe('/en/projects');
    expect(resolvePortfolioHref('es', link)).toBe('/es/projects');
    expect(resolvePortfolioAction('es', link)).toEqual({
      label: 'Projects',
      href: '/es/projects',
      external: false,
      variant: undefined,
      ariaLabel: undefined,
    });
  });

  it('preserves verified external links and their behavior', () => {
    const link = {
      label: 'External resource',
      href: 'https://angular.dev',
      external: true,
      variant: 'ghost',
    } satisfies PortfolioLinkContent;

    expect(resolvePortfolioAction('en', link)).toMatchObject({
      href: 'https://angular.dev',
      external: true,
      variant: 'ghost',
    });
  });
});
