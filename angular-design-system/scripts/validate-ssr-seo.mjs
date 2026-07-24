import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const serverUrl = new URL(process.argv[2] ?? 'http://localhost:4000');
const seoConfig = JSON.parse(
  await readFile(new URL('../projects/portfolio/seo.config.json', import.meta.url), 'utf8'),
);
const publicRoutes = seoConfig.supportedLocales.flatMap((locale) =>
  seoConfig.indexableRouteSegments.map((segment) => ({
    locale,
    path: `/${locale}${segment ? `/${segment}` : ''}`,
  })),
);

for (const route of publicRoutes) {
  const response = await fetch(new URL(route.path, serverUrl));
  assert.equal(response.status, 200, `${route.path} must render with HTTP 200`);
  const html = await response.text();
  const tags = parseHeadTags(html);
  const expectedCanonical = `${seoConfig.baseUrl}${route.path}`;
  const expectedImage = `${seoConfig.baseUrl}${seoConfig.defaultSocialImagePath}`;

  assert.match(html, new RegExp(`<html[^>]+lang="${route.locale}"`, 'u'), `${route.path} lang`);
  assertSingle(tags, 'meta', 'name', 'description');
  assert.equal(
    assertSingle(tags, 'meta', 'name', 'robots').attributes.content,
    'index, follow',
    `${route.path} robots`,
  );
  assert.equal(
    assertSingle(tags, 'link', 'rel', 'canonical').attributes.href,
    expectedCanonical,
    `${route.path} canonical`,
  );
  assert.equal(
    assertSingle(tags, 'meta', 'property', 'og:url').attributes.content,
    expectedCanonical,
    `${route.path} og:url`,
  );
  assert.equal(
    assertSingle(tags, 'meta', 'property', 'og:image').attributes.content,
    expectedImage,
    `${route.path} og:image`,
  );
  assert.equal(
    assertSingle(tags, 'meta', 'name', 'twitter:image').attributes.content,
    expectedImage,
    `${route.path} twitter:image`,
  );
  assert.equal(
    assertSingle(tags, 'meta', 'name', 'twitter:card').attributes.content,
    'summary_large_image',
    `${route.path} twitter:card`,
  );
  assertSingle(tags, 'meta', 'property', 'og:title');
  assertSingle(tags, 'meta', 'property', 'og:description');
  assertSingle(tags, 'meta', 'name', 'twitter:title');
  assertSingle(tags, 'meta', 'name', 'twitter:description');
  assert.equal(findTags(tags, 'meta', 'name', 'twitter:site').length, 0);
  assert.equal(findTags(tags, 'meta', 'name', 'twitter:creator').length, 0);

  const alternates = findTags(tags, 'link', 'rel', 'alternate');
  assert.equal(alternates.length, 3, `${route.path} must render three hreflang links`);
  for (const locale of seoConfig.supportedLocales) {
    const alternate = alternates.find((tag) => tag.attributes.hreflang === locale);
    const localizedPath = route.path.replace(/^\/(en|es)(?=\/|$)/u, `/${locale}`);
    assert.equal(alternate?.attributes.href, `${seoConfig.baseUrl}${localizedPath}`);
  }
  assert.equal(
    alternates.find((tag) => tag.attributes.hreflang === 'x-default')?.attributes.href,
    `${seoConfig.baseUrl}${route.path.replace(/^\/(en|es)(?=\/|$)/u, '/en')}`,
  );

  const person = parseJsonLd(html, 'seo-jsonld-person');
  const website = parseJsonLd(html, 'seo-jsonld-website');
  assert.equal(person['@type'], 'Person');
  assert.deepEqual(person.sameAs, ['https://www.linkedin.com/in/gonzalo-herrera-a40a85b4/']);
  assert.equal(website['@type'], 'WebSite');
  assert.deepEqual(website.inLanguage, ['en', 'es']);
}

const notFoundPaths = [
  '/en/does-not-exist',
  '/es/no-existe',
  '/en/projects/unknown-project',
  '/es/content/unknown-content',
];
for (const path of notFoundPaths) {
  const response = await fetch(new URL(path, serverUrl));
  assert.equal(response.status, 404, `${path} must return HTTP 404`);
  const html = await response.text();
  const tags = parseHeadTags(html);
  assert.equal(
    assertSingle(tags, 'meta', 'name', 'robots').attributes.content,
    'noindex, nofollow',
  );
  assert.equal(findTags(tags, 'link', 'rel', 'canonical').length, 0);
  assert.equal(findTags(tags, 'link', 'rel', 'alternate').length, 0);
  assert.equal(findTags(tags, 'meta', 'property', 'og:url').length, 0);
}

const [robotsResponse, sitemapResponse, imageResponse] = await Promise.all([
  fetch(new URL('/robots.txt', serverUrl)),
  fetch(new URL('/sitemap.xml', serverUrl)),
  fetch(new URL(seoConfig.defaultSocialImagePath, serverUrl)),
]);
assert.equal(robotsResponse.status, 200);
assert.equal(sitemapResponse.status, 200);
assert.equal(imageResponse.status, 200);
assert.match(
  await robotsResponse.text(),
  new RegExp(`Sitemap: ${seoConfig.baseUrl}/sitemap.xml`, 'u'),
);
const sitemap = await sitemapResponse.text();
assert.equal((sitemap.match(/<url>/gu) ?? []).length, 12);
const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gu)].map((match) => match[1]);
assert.equal(sitemapLocations.length, 12);
assert.equal(
  sitemapLocations.some((url) => /not-found|does-not-exist|storybook|showcase|[?#]/u.test(url)),
  false,
);
assert.match(imageResponse.headers.get('content-type') ?? '', /^image\/jpeg/u);
assert.ok((await imageResponse.arrayBuffer()).byteLength > 0);

console.log(
  `SSR SEO validation passed for ${publicRoutes.length} public routes, ${notFoundPaths.length} real HTTP 404 routes and 3 public SEO assets.`,
);

function parseHeadTags(html) {
  return [...html.matchAll(/<(meta|link)\b[^>]*>/gu)].map((match) => ({
    name: match[1],
    attributes: Object.fromEntries(
      [...match[0].matchAll(/([:@\w-]+)="([^"]*)"/gu)].map((attribute) => [
        attribute[1],
        decodeHtml(attribute[2]),
      ]),
    ),
  }));
}

function findTags(tags, name, attribute, value) {
  return tags.filter((tag) => tag.name === name && tag.attributes[attribute] === value);
}

function assertSingle(tags, name, attribute, value) {
  const matches = findTags(tags, name, attribute, value);
  assert.equal(matches.length, 1, `Expected one ${name}[${attribute}="${value}"]`);
  return matches[0];
}

function parseJsonLd(html, id) {
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gu)].filter((match) =>
    new RegExp(`\\bid="${id}"`, 'u').test(match[1]),
  );
  assert.equal(scripts.length, 1, `Expected one JSON-LD script #${id}`);
  return JSON.parse(scripts[0][2]);
}

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}
