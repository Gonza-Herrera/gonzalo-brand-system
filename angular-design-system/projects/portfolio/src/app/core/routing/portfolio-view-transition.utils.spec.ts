import {
  getLocaleFromRouteSnapshot,
  type PortfolioRouteSnapshotLike,
  shouldAnimateLocaleTransition,
} from './portfolio-view-transition.utils';

function createSnapshot(
  locale?: string,
  firstChild: PortfolioRouteSnapshotLike | null = null,
): PortfolioRouteSnapshotLike {
  return {
    params: locale ? { locale } : {},
    firstChild,
  };
}

describe('Portfolio locale view transitions', () => {
  it('finds a locale in a nested route snapshot', () => {
    const snapshot = createSnapshot(undefined, createSnapshot('es', createSnapshot()));

    expect(getLocaleFromRouteSnapshot(snapshot)).toBe('es');
  });

  it('animates only when navigation changes between supported locales', () => {
    const englishRoute = createSnapshot(undefined, createSnapshot('en'));
    const spanishRoute = createSnapshot(undefined, createSnapshot('es'));

    expect(shouldAnimateLocaleTransition(englishRoute, spanishRoute, false)).toBe(true);
    expect(shouldAnimateLocaleTransition(spanishRoute, englishRoute, false)).toBe(true);
    expect(shouldAnimateLocaleTransition(englishRoute, englishRoute, false)).toBe(false);
  });

  it('does not animate missing or unsupported locales', () => {
    expect(shouldAnimateLocaleTransition(createSnapshot(), createSnapshot('es'), false)).toBe(
      false,
    );
    expect(shouldAnimateLocaleTransition(createSnapshot('en'), createSnapshot('pt'), false)).toBe(
      false,
    );
  });

  it('respects the reduced-motion preference', () => {
    expect(shouldAnimateLocaleTransition(createSnapshot('en'), createSnapshot('es'), true)).toBe(
      false,
    );
  });
});
