import { InjectionToken } from '@angular/core';

import runtimeSeoConfig from '../../../../seo.config.json';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';
import type { SeoConfiguration } from './seo.models';
import { normalizeBaseUrl, normalizePublicPath } from './seo.utils';

declare const PORTFOLIO_SITE_URL: string;

const configuredSiteUrl =
  typeof PORTFOLIO_SITE_URL === 'string' && PORTFOLIO_SITE_URL.trim()
    ? PORTFOLIO_SITE_URL
    : runtimeSeoConfig.baseUrl;

const verifiedProfileUrls = [PORTFOLIO_CONFIG.urls.linkedin, PORTFOLIO_CONFIG.urls.github].flatMap(
  (url) => (typeof url === 'string' ? [url] : []),
);

export const SEO_CONFIG_VALUE = {
  siteName: PORTFOLIO_CONFIG.identity.name,
  authorName: PORTFOLIO_CONFIG.identity.name,
  baseUrl: normalizeBaseUrl(configuredSiteUrl),
  defaultLocale: PORTFOLIO_CONFIG.defaultLocale,
  supportedLocales: PORTFOLIO_CONFIG.supportedLocales,
  defaultSocialImagePath: normalizePublicPath(runtimeSeoConfig.defaultSocialImagePath),
  twitterCard: 'summary_large_image',
  openGraphLocales: {
    en: 'en_US',
    es: 'es_AR',
  },
  socialImageAlt: {
    en: 'Gonzalo Herrera — Frontend Tech Lead and AI-Augmented Engineer',
    es: 'Gonzalo Herrera — Frontend Tech Lead e Ingeniero Aumentado por IA',
  },
  personJobTitle: {
    en: 'Frontend Tech Lead & AI-Augmented Engineer',
    es: 'Frontend Tech Lead e Ingeniero Aumentado por IA',
  },
  personKnowsAbout: [
    'Angular',
    'Frontend engineering',
    'Frontend architecture',
    'Technical leadership',
    'Design systems',
    'AI-assisted software development',
  ],
  verifiedProfileUrls,
} as const satisfies SeoConfiguration;

export const SEO_CONFIG = new InjectionToken<SeoConfiguration>('SEO_CONFIG', {
  providedIn: 'root',
  factory: () => SEO_CONFIG_VALUE,
});
