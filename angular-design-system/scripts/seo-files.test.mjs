import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  buildPublicUrls,
  renderRobots,
  renderSitemap,
  validateSeoFileConfig,
} from './seo-files.mjs';

const config = validateSeoFileConfig({
  baseUrl: 'https://portfolio.example',
  defaultSocialImagePath: '/assets/social/gonzalo-herrera-og.jpg',
  supportedLocales: ['en', 'es'],
  indexableRouteSegments: [
    '',
    'about',
    'experience',
    'projects',
    'projects/angular-design-system',
    'content',
    'content/angular-14-vs-angular-20',
    'content/lessons-from-code-reviews',
    'content/building-ai-agents',
    'contact',
  ],
});

describe('SEO public file generation', () => {
  it('generates all localized, indexable portfolio URLs exactly once', () => {
    const urls = buildPublicUrls(config);
    assert.equal(urls.length, 20);
    assert.equal(new Set(urls).size, urls.length);
    assert.ok(urls.includes('https://portfolio.example/en/projects/angular-design-system'));
    assert.ok(urls.includes('https://portfolio.example/es/content/building-ai-agents'));
    assert.equal(
      urls.some((url) => url.includes('signals-forms-vs-reactive-forms')),
      false,
    );
    assert.equal(
      urls.some((url) => url.includes('ai-code-review-assistant')),
      false,
    );
    assert.equal(
      urls.some((url) => /not-found|storybook|showcase|[?#]/u.test(url)),
      false,
    );
  });

  it('renders a production robots policy using the configured domain', () => {
    const robots = renderRobots(config);
    assert.match(robots, /^User-agent: \*\nAllow: \/$/mu);
    assert.match(robots, /Sitemap: https:\/\/portfolio\.example\/sitemap\.xml/u);
    assert.doesNotMatch(robots, /Disallow: \//u);
  });

  it('renders valid sitemap framing without invented freshness or priority data', () => {
    const sitemap = renderSitemap(config);
    assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/u);
    assert.match(sitemap, /xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/u);
    assert.equal((sitemap.match(/<url>/gu) ?? []).length, 20);
    assert.doesNotMatch(sitemap, /<lastmod>|<changefreq>|<priority>/u);
  });

  it('rejects a non-HTTPS, path-scoped or duplicated configuration', () => {
    assert.throws(() => validateSeoFileConfig({ ...config, baseUrl: 'http://example.com' }));
    assert.throws(() =>
      validateSeoFileConfig({ ...config, baseUrl: 'https://example.com/portfolio' }),
    );
    assert.throws(() => validateSeoFileConfig({ ...config, supportedLocales: ['en', 'en'] }));
  });
});
