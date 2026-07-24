import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

import { renderRobots, renderSitemap } from './seo-files.mjs';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDirectory, '..');
const outputRoot = join(workspaceRoot, 'dist/portfolio');
const browserDirectory = join(workspaceRoot, 'dist/portfolio/browser');
const templatePath = join(workspaceRoot, 'projects/portfolio/static/404.html');

export async function preparePortfolioStaticOutput({ preview, siteUrl, sourceConfig }) {
  const outputConfig = { ...sourceConfig, baseUrl: siteUrl };
  const outputFiles = await readdir(browserDirectory);
  const stylesheets = outputFiles.filter((name) => /^styles-[A-Z0-9]+\.css$/iu.test(name));

  if (stylesheets.length !== 1) {
    throw new Error(
      `Expected one fingerprinted global stylesheet in ${browserDirectory}; found ${stylesheets.length}.`,
    );
  }

  const template = await readFile(templatePath, 'utf8');
  const notFoundHtml = template.replaceAll(
    '__PORTFOLIO_STYLESHEET__',
    `/${stylesheets[0]}`,
  );
  await writeFile(join(browserDirectory, '404.html'), notFoundHtml, 'utf8');
  await rm(join(outputRoot, 'server'), { recursive: true, force: true });

  if (preview) {
    await writeFile(join(browserDirectory, 'robots.txt'), 'User-agent: *\nDisallow: /\n', 'utf8');
    await writeFile(
      join(browserDirectory, '_headers'),
      '/*\n  X-Robots-Tag: noindex, nofollow\n',
      'utf8',
    );
    await rm(join(browserDirectory, 'sitemap.xml'), { force: true });
    return;
  }

  await Promise.all([
    writeFile(join(browserDirectory, 'robots.txt'), renderRobots(outputConfig), 'utf8'),
    writeFile(join(browserDirectory, 'sitemap.xml'), renderSitemap(outputConfig), 'utf8'),
    rm(join(browserDirectory, '_headers'), { force: true }),
  ]);
}
