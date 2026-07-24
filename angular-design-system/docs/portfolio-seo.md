# Portfolio SEO and social metadata

The Portfolio renders localized technical SEO and social metadata on the server and updates the
same head elements during hydrated client navigation. Routes and page IDs remain the durable
identity; page components do not own head mutations.

## Architecture

```text
stable route data.pageId + active locale + current path
                         ↓
PortfolioTitleStrategy resolves base/detail content
                         ↓
SeoService builds one deterministic head view
                         ↓
title + meta + canonical/hreflang + JSON-LD
```

The implementation is split by responsibility:

- `projects/portfolio/seo.config.json` is the deployment source for the base URL, public social
  image, supported locales and sitemap base routes.
- `src/app/core/seo/seo.models.ts` defines the readonly contracts.
- `src/app/core/seo/seo.registry.ts` maps every stable `PortfolioPageId` to localized metadata and
  indexability. It derives copy from the existing typed content registry.
- `src/app/core/seo/seo.utils.ts` normalizes URLs, builds alternates and safely serializes JSON-LD.
- `src/app/core/seo/seo.service.ts` is the only service that mutates SEO-owned head elements.
- `PortfolioTitleStrategy` resolves the current page and delegates to `SeoService`; valid Project
  and Content detail routes reuse the same pipeline with their localized title and excerpt.

No page subscribes to router events or manually inserts tags. Angular calls the title strategy on
direct SSR loads and client navigation, including locale changes. Managed links use
`data-portfolio-seo="true"` so canonical and alternate links can be replaced without affecting
unrelated document links.

## Deployment domain

The repository intentionally uses the non-production placeholder:

```json
{
  "baseUrl": "https://portfolio.example"
}
```

Before production deployment:

1. Replace `baseUrl` in `projects/portfolio/seo.config.json` with the approved HTTPS origin.
2. Add the approved hostname to Portfolio's `security.allowedHosts` in `angular.json`.
3. Run `npm run seo:generate` and commit the regenerated `robots.txt` and `sitemap.xml`.
4. Run `npm run seo:check`, `npm run build:portfolio` and the SSR validation described below.
5. Confirm no generated canonical, alternate, Open Graph, Twitter or sitemap URL contains
   `portfolio.example` or a local hostname.

The URL validator rejects HTTP, credentials, subpaths, queries and fragments. Builds remain usable
with the explicit placeholder so local development does not depend on an unconfirmed domain.

## Localized metadata

The six public base pages have English and Spanish titles and descriptions in the typed content
registry. Their SEO definitions are indexable and emit:

- one title, description, author and `robots=index, follow`;
- one self-referencing absolute canonical URL;
- `hreflang=en`, `hreflang=es` and `hreflang=x-default`;
- Open Graph `website` metadata with `en_US` or `es_AR`;
- `summary_large_image` Twitter/X metadata without unverified account handles;
- an absolute social image URL and localized image alt text.

Project and Content details use the localized slug content and preserve the same slug across
alternates. Only the twelve required base routes are included in the sitemap; detail routes remain
discoverable through internal links and canonical metadata.

## Structured data

Every rendered page contains exactly two scripts with stable IDs:

- `seo-jsonld-person` — `Person`, localized `jobTitle`, confirmed areas of knowledge and the
  verified LinkedIn URL from `PORTFOLIO_CONFIG.urls`.
- `seo-jsonld-website` — `WebSite`, the configured site origin and `inLanguage: ["en", "es"]`.

No email, phone, address, employer, GitHub profile, Twitter account or unverified social profile is
published. JSON is produced with `JSON.stringify`; `<` is escaped before writing `textContent` so a
controlled future value cannot terminate the script element.

## Not Found

Unknown localized paths render localized 404 content and:

- return HTTP status `404` during SSR through Angular's `RESPONSE_INIT`;
- use `noindex, nofollow`;
- omit canonical, `hreflang` and `og:url`;
- remain absent from the sitemap;
- retain localized title, description, social image and structured identity data.

Unknown Project or Content slugs receive the same non-indexable behavior and HTTP status.

## Social image

The default asset is:

```text
projects/portfolio/public/assets/social/gonzalo-herrera-og.jpg
```

It is a crawler-compatible 1200×630 JPEG using the approved ivory, ink, lavender, peach and cloud
blue palette. The image is a generated visual candidate because no approved social cover existed
in the repository when PR 18 was implemented. It must receive a final visual/content approval
before the production domain is published. A later approved page-specific image can be supplied
through `LocalizedSeoMetadata.socialImagePath`; the global image remains the fallback.

## Robots and sitemap generation

`scripts/seo-files.mjs` reads the shared JSON configuration and deterministically generates:

- `projects/portfolio/public/robots.txt`;
- `projects/portfolio/public/sitemap.xml`.

The sitemap contains exactly:

```text
/en
/en/about
/en/experience
/en/projects
/en/content
/en/contact
/es
/es/about
/es/experience
/es/projects
/es/content
/es/contact
```

It deliberately omits invented `lastmod`, `changefreq` and `priority` values. Generation has no
third-party dependency and validates duplicate locales/routes, invalid origins, query strings and
fragments.

```bash
npm run seo:generate
npm run seo:check
npm run test:seo-files
```

Portfolio start and build commands regenerate these files. Test commands check that committed
outputs are current.

## Validation

Build and start the production SSR output:

```bash
npm run build:portfolio
npm run serve:ssr:portfolio
```

In a second terminal:

```bash
npm run validate:ssr:seo
```

The validator checks all twelve base routes, both localized page-level 404 examples, invalid Project
and Content details, deduplicated canonical and alternate links, Open Graph, Twitter, JSON-LD,
language, HTTP status, `robots.txt`, `sitemap.xml` and the public JPEG response.

Also run:

```bash
npm run test:portfolio
npm run build
npm test -- --watch=false
npm run build-storybook
```

After the real domain is deployed, complete the external checks that cannot be proven locally:

- Google Rich Results Test and Search Console URL Inspection;
- Bing Webmaster Tools;
- LinkedIn Post Inspector;
- X/Twitter Card preview;
- Slack, WhatsApp and Discord link previews;
- public retrieval of `/robots.txt`, `/sitemap.xml` and the social image.

Search-engine verification tags are intentionally absent until approved values exist. Add them only
to the optional central fields in `SeoConfiguration`; never add empty tags or duplicate them in
`index.html`.

## Adding an indexable page

1. Add its stable page ID and route segment to the Portfolio content model.
2. Add structurally equivalent English and Spanish metadata to the typed content registry.
3. Register the lazy route with `data.pageId`.
4. Add the route segment to `indexableRouteSegments` if it is a public base page.
5. Regenerate SEO files.
6. Extend registry, navigation, SSR and sitemap tests.

Do not add Not Found, internal tools, Storybook, Showcase, disabled pages, assets or URLs with query
parameters to the sitemap.
