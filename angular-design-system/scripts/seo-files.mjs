import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDirectory, '..');
const configPath = join(workspaceRoot, 'projects/portfolio/seo.config.json');
const publicDirectory = join(workspaceRoot, 'projects/portfolio/public');
const robotsPath = join(publicDirectory, 'robots.txt');
const sitemapPath = join(publicDirectory, 'sitemap.xml');

export function validateSeoFileConfig(config) {
  const baseUrl = new URL(config.baseUrl);
  if (
    baseUrl.protocol !== 'https:' ||
    baseUrl.username ||
    baseUrl.password ||
    baseUrl.pathname !== '/' ||
    baseUrl.search ||
    baseUrl.hash
  ) {
    throw new Error(
      'projects/portfolio/seo.config.json: baseUrl must be an HTTPS origin without path, query or hash.',
    );
  }
  if (!Array.isArray(config.supportedLocales) || config.supportedLocales.length === 0) {
    throw new Error('SEO supportedLocales must contain at least one locale.');
  }
  if (!Array.isArray(config.indexableRouteSegments) || config.indexableRouteSegments.length === 0) {
    throw new Error('SEO indexableRouteSegments must contain at least one route.');
  }

  const values = [...config.supportedLocales, ...config.indexableRouteSegments];
  if (values.some((value) => typeof value !== 'string' || /[?#]/u.test(value))) {
    throw new Error('SEO locales and route segments must be strings without query or fragment.');
  }
  if (new Set(config.supportedLocales).size !== config.supportedLocales.length) {
    throw new Error('SEO supportedLocales must not contain duplicates.');
  }
  if (new Set(config.indexableRouteSegments).size !== config.indexableRouteSegments.length) {
    throw new Error('SEO indexableRouteSegments must not contain duplicates.');
  }

  return {
    ...config,
    baseUrl: baseUrl.origin,
  };
}

export function buildPublicUrls(config) {
  return config.supportedLocales.flatMap((locale) =>
    config.indexableRouteSegments.map((routeSegment) => {
      const segment = routeSegment.replace(/^\/+|\/+$/gu, '');
      return `${config.baseUrl}/${locale}${segment ? `/${segment}` : ''}`;
    }),
  );
}

export function renderRobots(config) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${config.baseUrl}/sitemap.xml\n`;
}

export function renderSitemap(config) {
  const urls = buildPublicUrls(config)
    .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export async function loadSeoFileConfig() {
  return validateSeoFileConfig(JSON.parse(await readFile(configPath, 'utf8')));
}

export async function generateSeoFiles() {
  const config = await loadSeoFileConfig();
  await Promise.all([
    writeFile(robotsPath, renderRobots(config), 'utf8'),
    writeFile(sitemapPath, renderSitemap(config), 'utf8'),
  ]);
}

export async function checkSeoFiles() {
  const config = await loadSeoFileConfig();
  const expected = [
    [robotsPath, renderRobots(config)],
    [sitemapPath, renderSitemap(config)],
  ];
  for (const [path, content] of expected) {
    const current = await readFile(path, 'utf8').catch(() => '');
    if (current !== content) {
      throw new Error(
        `${path} is stale. Run "npm run seo:generate" and commit the generated files.`,
      );
    }
  }
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const mode = process.argv[2] ?? 'generate';
  const action = mode === 'check' ? checkSeoFiles : mode === 'generate' ? generateSeoFiles : null;
  if (!action) {
    throw new Error(`Unknown SEO files mode "${mode}". Use "generate" or "check".`);
  }
  await action();
  console.log(`SEO public files ${mode === 'check' ? 'are current' : 'generated successfully'}.`);
}
