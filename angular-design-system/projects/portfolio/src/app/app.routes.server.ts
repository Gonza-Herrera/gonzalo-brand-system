import { RenderMode, ServerRoute } from '@angular/ssr';

import seoConfig from '../../seo.config.json';

const detailRouteEntries = seoConfig.indexableRouteSegments.filter((segment) =>
  /^(projects|content)\//u.test(segment),
);
const baseRouteSegments = seoConfig.indexableRouteSegments.filter(
  (segment) => !detailRouteEntries.includes(segment),
);
const projectSlugs = detailRouteEntries
  .filter((segment) => segment.startsWith('projects/'))
  .map((segment) => segment.slice('projects/'.length));
const contentSlugs = detailRouteEntries
  .filter((segment) => segment.startsWith('content/'))
  .map((segment) => segment.slice('content/'.length));

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  ...baseRouteSegments.map((segment): ServerRoute => ({
    path: segment ? `:locale/${segment}` : ':locale',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => seoConfig.supportedLocales.map((locale) => ({ locale })),
  })),
  {
    path: ':locale/projects/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      seoConfig.supportedLocales.flatMap((locale) =>
        projectSlugs.map((slug) => ({ locale, slug })),
      ),
  },
  {
    path: ':locale/content/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      seoConfig.supportedLocales.flatMap((locale) =>
        contentSlugs.map((slug) => ({ locale, slug })),
      ),
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
