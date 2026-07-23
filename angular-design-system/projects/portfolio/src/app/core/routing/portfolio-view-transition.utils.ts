import type { PortfolioLocale } from '../../content/models/portfolio-locale.type';
import { isPortfolioLocale } from '../../content/models/portfolio-locale.type';

export const PORTFOLIO_LOCALE_TRANSITION_CLASS = 'portfolio-locale-transition';
export const PORTFOLIO_REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export interface PortfolioRouteSnapshotLike {
  readonly params: Readonly<Record<string, unknown>>;
  readonly firstChild: PortfolioRouteSnapshotLike | null;
}

export function getLocaleFromRouteSnapshot(
  snapshot: PortfolioRouteSnapshotLike,
): PortfolioLocale | null {
  let current: PortfolioRouteSnapshotLike | null = snapshot;

  while (current) {
    const locale = current.params['locale'];

    if (isPortfolioLocale(locale)) {
      return locale;
    }

    current = current.firstChild;
  }

  return null;
}

export function shouldAnimateLocaleTransition(
  from: PortfolioRouteSnapshotLike,
  to: PortfolioRouteSnapshotLike,
  prefersReducedMotion: boolean,
): boolean {
  if (prefersReducedMotion) {
    return false;
  }

  const fromLocale = getLocaleFromRouteSnapshot(from);
  const toLocale = getLocaleFromRouteSnapshot(to);

  return fromLocale !== null && toLocale !== null && fromLocale !== toLocale;
}
