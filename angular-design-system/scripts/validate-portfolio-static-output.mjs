import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

import { buildPublicUrls } from './seo-files.mjs';
import { resolvePortfolioDeployment } from './portfolio-deployment-config.mjs';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDirectory, '..');
const outputRoot = join(workspaceRoot, 'dist/portfolio');
const browserDirectory = join(outputRoot, 'browser');

export async function validatePortfolioStaticOutput({ preview, siteUrl, sourceConfig }) {
  const expectedConfig = { ...sourceConfig, baseUrl: siteUrl };
  const publicUrls = buildPublicUrls(expectedConfig);
  const routes = sourceConfig.supportedLocales.flatMap((locale) =>
    sourceConfig.indexableRouteSegments.map((segment) => ({
      locale,
      route: `/${locale}${segment ? `/${segment}` : ''}`,
    })),
  );

  await assertMissing(
    join(outputRoot, 'server'),
    'Static output must not contain a server bundle.',
  );
  await assertFile(join(browserDirectory, 'index.html'));
  await assertFile(join(browserDirectory, '404.html'));
  await assertFile(join(browserDirectory, sourceConfig.defaultSocialImagePath));
  await assertFile(join(browserDirectory, 'favicon.ico'));

  for (const { locale, route } of routes) {
    const htmlPath = join(browserDirectory, route, 'index.html');
    const html = await readFile(htmlPath, 'utf8');
    const canonical = `${siteUrl}${route}`;

    assert.match(html, new RegExp(`<html[^>]+lang="${locale}"`, 'u'), `${route} lang`);
    assert.match(html, /<meta name="robots" content="index, follow">/u, `${route} robots`);
    assert.match(
      html,
      new RegExp(`<link[^>]+rel="canonical"[^>]+href="${escapeRegExp(canonical)}"[^>]*>`, 'u'),
      `${route} canonical`,
    );
    assert.match(html, /<script[^>]+type="application\/ld\+json"[^>]*>/u, `${route} JSON-LD`);
    assert.doesNotMatch(
      html,
      /portfolio\.example|localhost|127\.0\.0\.1/iu,
      `${route} placeholder`,
    );
  }

  const notFoundHtml = await readFile(join(browserDirectory, '404.html'), 'utf8');
  assert.match(notFoundHtml, /<meta name="robots" content="noindex, nofollow"\s*\/?>/u);
  assert.match(notFoundHtml, /href="\/en"/u);
  assert.match(notFoundHtml, /href="\/es"/u);
  assert.doesNotMatch(notFoundHtml, /<link rel="canonical"/u);
  assert.doesNotMatch(notFoundHtml, /__PORTFOLIO_STYLESHEET__|\{\{/u);

  const robots = await readFile(join(browserDirectory, 'robots.txt'), 'utf8');
  if (preview) {
    assert.equal(robots, 'User-agent: *\nDisallow: /\n');
    await assertMissing(
      join(browserDirectory, 'sitemap.xml'),
      'Preview output must omit sitemap.xml.',
    );
    assert.match(await readFile(join(browserDirectory, '_headers'), 'utf8'), /X-Robots-Tag/u);
  } else {
    assert.match(robots, new RegExp(`Sitemap: ${escapeRegExp(siteUrl)}/sitemap\\.xml`, 'u'));
    const sitemap = await readFile(join(browserDirectory, 'sitemap.xml'), 'utf8');
    const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gu)].map((match) => match[1]);
    assert.deepEqual(locations, publicUrls);
    await assertMissing(
      join(browserDirectory, '_headers'),
      'Production output must not include preview-only headers.',
    );
  }

  const rootFiles = await readdir(browserDirectory);
  assert.ok(rootFiles.some((name) => /^main-[A-Z0-9]+\.js$/iu.test(name)));
  assert.ok(rootFiles.some((name) => /^styles-[A-Z0-9]+\.css$/iu.test(name)));
  assert.equal(
    rootFiles.some((name) => name.endsWith('.map')),
    false,
  );

  console.log(
    `Static Portfolio validation passed for ${routes.length} localized routes, 404.html and ${preview ? 'preview' : 'production'} SEO artifacts.`,
  );
}

async function assertFile(path) {
  await access(path);
}

async function assertMissing(path, message) {
  try {
    await access(path);
  } catch {
    return;
  }
  assert.fail(message);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const deployment = await resolvePortfolioDeployment({
    requestedContext: process.argv[2] ?? 'development',
  });
  await validatePortfolioStaticOutput(deployment);
}
