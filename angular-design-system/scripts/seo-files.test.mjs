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
  indexableRouteSegments: ['', 'about', 'experience', 'projects', 'content', 'contact'],
});

describe('SEO public file generation', () => {
  it('generates the twelve localized, indexable portfolio URLs exactly once', () => {
    const urls = buildPublicUrls(config);
    assert.equal(urls.length, 12);
    assert.equal(new Set(urls).size, urls.length);
    assert.deepEqual(urls, [
      'https://portfolio.example/en',
      'https://portfolio.example/en/about',
      'https://portfolio.example/en/experience',
      'https://portfolio.example/en/projects',
      'https://portfolio.example/en/content',
      'https://portfolio.example/en/contact',
      'https://portfolio.example/es',
      'https://portfolio.example/es/about',
      'https://portfolio.example/es/experience',
      'https://portfolio.example/es/projects',
      'https://portfolio.example/es/content',
      'https://portfolio.example/es/contact',
    ]);
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
    assert.equal((sitemap.match(/<url>/gu) ?? []).length, 12);
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
