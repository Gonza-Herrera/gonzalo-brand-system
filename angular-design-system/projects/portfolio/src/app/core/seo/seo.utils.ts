import type { PortfolioLocale } from '../../content/models/portfolio-locale.type';
import type {
  LocalizedSeoMetadata,
  SeoAlternateLink,
  SeoConfiguration,
  SeoPageDefinition,
  SeoUpdateInput,
  SeoViewModel,
} from './seo.models';

export function normalizeBaseUrl(value: string): string {
  const url = new URL(value);
  if (url.protocol !== 'https:') {
    throw new Error('SEO baseUrl must use HTTPS.');
  }
  if (url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error(
      'SEO baseUrl must be an HTTPS origin without credentials, path, query or hash.',
    );
  }
  return url.origin;
}

export function normalizePublicPath(value: string): string {
  const path = value.trim();
  if (!path || path.includes('?') || path.includes('#')) {
    throw new Error('SEO public paths must not be empty or contain a query or fragment.');
  }
  return `/${path.replace(/^\/+|\/+$/g, '')}`;
}

export function normalizeRoutePath(value: string): string {
  const withoutQueryOrFragment = value.split(/[?#]/u, 1)[0] ?? '';
  const normalized = `/${withoutQueryOrFragment.replace(/^\/+|\/+$/g, '')}`;
  return normalized === '/' ? '/' : normalized;
}

export function buildAbsoluteUrl(baseUrl: string, path: string): string {
  return new URL(normalizeRoutePath(path), `${normalizeBaseUrl(baseUrl)}/`).toString();
}

export function buildLocalizedPath(locale: PortfolioLocale, routeSegment: string): string {
  const segment = routeSegment.replace(/^\/+|\/+$/g, '');
  return segment ? `/${locale}/${segment}` : `/${locale}`;
}

export function switchPathLocale(path: string, locale: PortfolioLocale): string {
  const segments = normalizeRoutePath(path).split('/').filter(Boolean);
  if (segments[0] === 'en' || segments[0] === 'es') {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }
  return `/${segments.join('/')}`;
}

export function buildAlternateLinks(
  config: SeoConfiguration,
  path: string,
): readonly SeoAlternateLink[] {
  const localized = config.supportedLocales.map((locale) => ({
    hreflang: locale,
    href: buildAbsoluteUrl(config.baseUrl, switchPathLocale(path, locale)),
  }));
  const defaultHref = buildAbsoluteUrl(
    config.baseUrl,
    switchPathLocale(path, config.defaultLocale),
  );
  return [...localized, { hreflang: 'x-default', href: defaultHref }];
}

export function buildSeoViewModel(
  config: SeoConfiguration,
  definition: SeoPageDefinition,
  input: SeoUpdateInput,
): SeoViewModel {
  const metadata: LocalizedSeoMetadata = input.metadata ?? definition.metadata[input.locale];
  const indexable = input.indexable ?? definition.indexable;
  const path =
    input.path === undefined
      ? buildLocalizedPath(input.locale, definition.routeSegment)
      : normalizeRoutePath(input.path);
  const canonicalUrl = indexable ? buildAbsoluteUrl(config.baseUrl, path) : undefined;
  const image = buildAbsoluteUrl(
    config.baseUrl,
    metadata.socialImagePath ?? config.defaultSocialImagePath,
  );
  const alternateLocales = config.supportedLocales
    .filter((locale) => locale !== input.locale)
    .map((locale) => config.openGraphLocales[locale]);

  return {
    title: metadata.title,
    description: metadata.description,
    robots: metadata.robots ?? (indexable ? 'index, follow' : 'noindex, nofollow'),
    indexable,
    canonicalUrl,
    alternateLinks: indexable ? buildAlternateLinks(config, path) : [],
    openGraph: {
      type: 'website',
      siteName: config.siteName,
      title: metadata.ogTitle ?? metadata.title,
      description: metadata.ogDescription ?? metadata.description,
      url: canonicalUrl,
      image,
      imageAlt: config.socialImageAlt[input.locale],
      locale: config.openGraphLocales[input.locale],
      alternateLocales,
    },
    twitter: {
      card: config.twitterCard,
      title: metadata.ogTitle ?? metadata.title,
      description: metadata.ogDescription ?? metadata.description,
      image,
      imageAlt: config.socialImageAlt[input.locale],
    },
  };
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</gu, '\\u003c');
}
