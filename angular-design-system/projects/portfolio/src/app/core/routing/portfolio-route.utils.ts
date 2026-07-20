import {
  PORTFOLIO_PAGE_PATHS,
  PORTFOLIO_NAVIGATION_PAGE_IDS,
  type PortfolioNavigationPageId,
  type PortfolioPageId,
} from '../../content/models/page-content.model';
import {
  isPortfolioLocale,
  type PortfolioLocale,
} from '../../content/models/portfolio-locale.type';

interface UrlParts {
  readonly path: string;
  readonly suffix: string;
}

function splitUrl(url: string): UrlParts {
  const suffixIndex = url.search(/[?#]/);

  return suffixIndex === -1
    ? { path: url, suffix: '' }
    : { path: url.slice(0, suffixIndex), suffix: url.slice(suffixIndex) };
}

function pathSegments(path: string): readonly string[] {
  return path.split('/').filter((segment) => segment.length > 0);
}

function localizedUrl(locale: PortfolioLocale, segments: readonly string[], suffix = ''): string {
  const remainder = segments.length ? `/${segments.join('/')}` : '';
  return `/${locale}${remainder}${suffix}`;
}

export function createLocalizedPath(
  locale: PortfolioLocale,
  pageId: PortfolioNavigationPageId,
): string {
  const pagePath = PORTFOLIO_PAGE_PATHS[pageId];
  return localizedUrl(locale, pagePath ? [pagePath] : []);
}

export function switchLocaleInUrl(locale: PortfolioLocale, currentUrl: string): string {
  const { path, suffix } = splitUrl(currentUrl);
  const segments = pathSegments(path);
  const remainingSegments = isPortfolioLocale(segments[0]) ? segments.slice(1) : segments;

  return localizedUrl(locale, remainingSegments, suffix);
}

export function createInvalidLocaleFallbackUrl(
  defaultLocale: PortfolioLocale,
  invalidUrl: string,
): string {
  const { path, suffix } = splitUrl(invalidUrl);
  const [, ...remainingSegments] = pathSegments(path);

  return localizedUrl(defaultLocale, remainingSegments, suffix);
}

export function getPageIdFromUrl(url: string): PortfolioPageId {
  const { path } = splitUrl(url);
  const segments = pathSegments(path);
  const pageSegments = isPortfolioLocale(segments[0]) ? segments.slice(1) : segments;

  if (pageSegments.length === 0) {
    return 'home';
  }

  const pagePath = pageSegments[0];
  const pageId = PORTFOLIO_NAVIGATION_PAGE_IDS.find((candidatePageId) => {
    return PORTFOLIO_PAGE_PATHS[candidatePageId] === pagePath;
  });

  if (pageId === 'projects' && pageSegments.length === 2) {
    return 'projects';
  }

  if (pageSegments.length > 1) {
    return 'not-found';
  }

  return pageId ?? 'not-found';
}
