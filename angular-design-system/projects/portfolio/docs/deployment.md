# Portfolio deployment

The Portfolio is deployed as an Angular prerendered static site. Angular SSR runs only during the
build; Netlify publishes `dist/portfolio/browser` and no Node server, Function or Edge Function is
required.

## Production topology

```text
GitHub pull request
    ↓ Netlify Deploy Preview
Angular prerender (20 localized public routes)
    ↓ review and merge
Netlify production deploy
    ↓
https://gonzalo-herrera-dev.netlify.app
```

The repository root `netlify.toml` is the source of truth for the base directory, commands,
publish directory, redirects, response headers and cache policy. The root redirect and five known
legacy redirects are explicit. There is deliberately no `/* /index.html 200` SPA fallback because
it would hide missing static routes and turn real 404 responses into HTTP 200.

## Runtime versions

- Node: `22.18.0` in `.nvmrc`, `package.json` and `netlify.toml`.
- npm: `10.9.3` in `packageManager` and Netlify build configuration.
- Install command: `npm ci`.

Run all commands below from `angular-design-system/`.

## Build-time variables

| Variable               | Production | Preview / branch | Purpose                                      |
| ---------------------- | ---------- | ---------------- | -------------------------------------------- |
| `SITE_URL`             | Required   | Required         | Stable production origin used by all SEO URL |
| `WEB3FORMS_ACCESS_KEY` | Required   | Ignored          | Public browser key for contact submission    |
| `CONTEXT`              | Netlify    | Netlify          | Native Netlify deploy context                |

`SITE_URL` must be a public HTTPS origin without a path or trailing slash. It drives canonical,
hreflang, Open Graph URLs, Twitter image URLs, Person and WebSite JSON-LD, `robots.txt` and
`sitemap.xml`. The committed fallback in `projects/portfolio/seo.config.json` matches production,
but strict production and preview commands still require the environment variable so configuration
errors fail before compilation.

The Web3Forms key is included in the production browser bundle and is therefore not a backend
secret. It is nevertheless excluded from source, logs and previews. Because an earlier revision
contained a key, rotate it in Web3Forms before launch; removing it from the current tree does not
remove it from Git history.

Recommended Netlify scopes:

- `SITE_URL`: Builds, all deploy contexts, value
  `https://gonzalo-herrera-dev.netlify.app`.
- `WEB3FORMS_ACCESS_KEY`: Builds, production context only.

Do not commit `.env` or `.netlify/state.json`.

## Commands

Local static build with the committed production URL and the contact form disabled:

```bash
npm run build:portfolio
```

Strict production build:

```bash
SITE_URL=https://gonzalo-herrera-dev.netlify.app \
WEB3FORMS_ACCESS_KEY=<public-key> \
npm run build:portfolio:production
```

Preview-equivalent build:

```bash
SITE_URL=https://gonzalo-herrera-dev.netlify.app \
npm run build:portfolio:preview
```

Every build runs `scripts/validate-portfolio-static-output.mjs`. It verifies the localized route
set, canonical URLs, JSON-LD, social asset, favicon, SEO files, static 404, hashed assets, absence of
source maps and absence of a server bundle.

## Prerendered routes

The route manifest is centralized in `projects/portfolio/seo.config.json`. It currently emits EN
and ES versions of:

- Home, About, Experience, Projects, Content and Contact.
- Angular Design System case study.
- Angular 14 vs Angular 20.
- Lessons from thoughtful code reviews.
- Beyond chat: building AI agents that do real work.

Concept projects and planned or unavailable content are not prerendered or listed in the sitemap.
Adding an indexable detail requires complete bilingual content and one new manifest entry.

## Preview policy

Deploy Previews and branch deploys:

- retain production canonical and alternate URLs;
- emit `X-Robots-Tag: noindex, nofollow`;
- publish a disallow-all `robots.txt`;
- omit `sitemap.xml`;
- render Contact but leave submission unavailable;
- use the same static route and output validation as production.

Netlify also applies a noindex response to Deploy Previews, but the generated `_headers` rule makes
the repository policy explicit and covers branch deploys.

## Redirects and 404

Netlify redirects `/` to `/en` with HTTP 301. `/about`, `/experience`, `/projects`, `/content` and
`/contact` redirect to their English localized equivalents. Refreshes of prerendered EN/ES URLs are
served from their own `index.html`.

`projects/portfolio/static/404.html` is a maintainable bilingual template. Postbuild links it to the
current fingerprinted Design System stylesheet and writes it to the publish root. It is responsive,
keyboard accessible, noindex and independent of JavaScript. Netlify must return it with HTTP 404
for unknown direct requests; Angular keeps its richer localized Not Found states for client
navigation.

## Security and cache policy

`netlify.toml` applies:

- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `X-Frame-Options: DENY`;
- `Cross-Origin-Opener-Policy: same-origin`;
- a restrictive `Permissions-Policy`;
- a CSP limited to same-origin assets and `https://api.web3forms.com`.

The CSP allows inline scripts because prerendered JSON-LD and Angular's critical-CSS stylesheet
loader are inline, and inline styles because Angular critical CSS plus the static 404 use them.
`unsafe-eval` is not allowed. Replacing those inline blocks and the generated `onload` handler with
hash-based CSP entries can be evaluated later, but a per-request nonce is not available on static
hosting.

HTML and SEO control files revalidate immediately. Fingerprinted root JavaScript and CSS are cached
for one year with `immutable`. Stable favicon and social-image names use a one-hour policy. Netlify
atomic deploys invalidate the deploy context, preventing old HTML from pointing to missing assets.

## Deploy Preview and production validation

For each preview, verify:

```bash
curl -I https://<preview-host>/en
curl -I https://<preview-host>/es/contact
curl -I https://<preview-host>/not-a-real-page
curl -I https://<preview-host>/main-<hash>.js
curl https://<preview-host>/robots.txt
```

Check HTTP 200 for known routes, HTTP 404 for the unknown route, security/CSP/cache headers,
`X-Robots-Tag` on previews, keyboard/theme/locale behavior and absence of browser console or
hydration errors. Do not submit a real contact message from a preview.

After publishing production, repeat the route, 404, header, asset and metadata checks. Submit at
most one Web3Forms message and confirm delivery. If Web3Forms domain restrictions are enabled,
authorize the production `*.netlify.app` hostname in its dashboard.

## Rollback

1. Open the Netlify project's Deploys list.
2. Select the last known-good production deploy.
3. Use **Publish deploy** to atomically restore it.
4. Verify `/en`, `/es`, one detail route, `/robots.txt`, `/sitemap.xml` and a real 404.
5. Revert or fix the Git commit separately so the next Git build does not reintroduce the issue.

Do not rebuild an old commit merely to roll back; publishing an existing immutable deploy is faster
and preserves the exact reviewed artifact.

## Future custom domain

When a custom domain is approved:

1. configure DNS and TLS in Netlify;
2. update the single `baseUrl` in `seo.config.json`;
3. update the Netlify `SITE_URL`;
4. regenerate and commit robots/sitemap;
5. rebuild and validate canonical, hreflang, Open Graph and JSON-LD;
6. add a forced domain-level 301 only after the custom domain is active;
7. update Web3Forms domain restrictions and external search/social tools.

Do not keep both origins indexable.
