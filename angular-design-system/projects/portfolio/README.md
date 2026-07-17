# Portfolio

`portfolio` is Gonzalo Herrera's bilingual, SSR-enabled public website application. It is separate
from the technical Showcase and Storybook documentation: Portfolio owns real content, localized
routing and product concerns; Showcase validates integration; Storybook documents reusable APIs.

The current release adds the complete Portfolio Home to the global shell, routing and
internationalization foundation. About, Experience, Projects, Content and Contact remain localized
route placeholders for their dedicated follow-up PRs.

## Run, build and test

From `angular-design-system/`:

```bash
npm run start:portfolio
npm run build:portfolio
npm run test:portfolio
npm run build:ssr:portfolio
```

The development server uses `http://localhost:4200`. The production build emits browser and server
bundles with hydration. After building, `npm run serve:ssr:portfolio` serves them at
`http://localhost:4000` by default and respects the host-provided `PORT` variable.

## Localized routes

English (`en`) is the default locale and Spanish (`es`) is the only other supported locale. Every
public page has both route variants:

| Page       | English          | Spanish          |
| ---------- | ---------------- | ---------------- |
| Home       | `/en`            | `/es`            |
| About      | `/en/about`      | `/es/about`      |
| Experience | `/en/experience` | `/es/experience` |
| Projects   | `/en/projects`   | `/es/projects`   |
| Content    | `/en/content`    | `/es/content`    |
| Contact    | `/en/contact`    | `/es/contact`    |
| Not Found  | `/en/**`         | `/es/**`         |

Routing is deterministic and safe for direct SSR requests:

- `/` redirects to `/en`.
- Known legacy paths such as `/about` and `/projects` redirect to their English equivalents.
- An invalid locale keeps the remaining path and falls back to English: `/fr/about` becomes
  `/en/about`.
- Unknown pages under a valid locale render the localized 404 inside the shared shell.

The locale prefix in the URL is the source of truth. A stored preference never overrides an
explicit URL, which prevents the server from rendering English and the client immediately replacing
it with Spanish during hydration.

## Routing and content flow

```text
Localized URL
    ↓
portfolioLocaleGuard validates and activates the prefix
    ↓
PortfolioLocaleService updates its Signal and <html lang>
    ↓
Typed content registry selects EN_SITE_CONTENT or ES_SITE_CONTENT
    ↓
PortfolioShellComponent and the lazy page render localized content
```

`AppComponent` contains only the root `RouterOutlet`. The localized parent route renders
`PortfolioShellComponent`; its standalone child pages are lazy-loaded with `loadComponent`. Stable
`pageId` route data selects localized title and description metadata through
`PortfolioTitleStrategy`.

## Typed content

All copy is compile-time TypeScript under `src/app/content/`:

```text
content/
├── models/                         shared readonly contracts and stable IDs
├── en/home.content.ts              complete English Home
├── es/home.content.ts              equivalent Spanish Home
├── en/site-content.ts              English shell and page registry
├── es/site-content.ts              Spanish shell and page registry
└── portfolio-content.registry.ts   locale-to-content registry
```

There is no translation dependency, HTTP-loaded JSON, CMS, Markdown parser or application state
library. Both locale objects use `satisfies PortfolioSiteContent`, and parity tests protect their
page, navigation and shell structure.

### Add or edit a translation

1. Add the key to the relevant contract under `content/models/` if it does not exist.
2. Add the same structural key to both `en/site-content.ts` and `es/site-content.ts`.
3. Keep route IDs and navigation IDs stable; translate only user-facing values.
4. Run `npm run test:portfolio` to validate parity and completeness.

To add a future locale, extend `PORTFOLIO_LOCALES`, provide a complete
`PortfolioSiteContent` object, register it in `portfolio-content.registry.ts`, and add routing,
switcher and SSR tests. No locale beyond `en` and `es` is currently supported.

### Add a page

1. Add its stable ID and locale-independent path to `page-content.model.ts`.
2. Add structurally equivalent content and metadata to both locale files.
3. Create a lazy standalone page under `pages/` that reads from `PortfolioLocaleService`.
4. Add the localized child route and its `pageId` in `app.routes.ts`.
5. If it belongs in global navigation, add the same ID to both localized navigation arrays.
6. Cover both route variants, active state and metadata in routing tests.

Internal links should keep the current locale. Use `createLocalizedPath(locale, pageId)` for a known
page and `PortfolioLocaleService.buildLocalizedUrl(locale, currentUrl)` when preserving the current
path while changing locale.

## Home page

`/en` and `/es` render the same six-section structure with locale-specific copy:

1. Hero with the official tagline, role, value proposition and two internal actions.
2. Expertise with six areas spanning frontend, leadership, Angular, AI, developer experience and
   mentoring.
3. Selected Projects with the Angular Design System plus three explicitly labelled concepts.
4. Experience Preview with a verified-data empty state and a link to the future full page.
5. Featured Content with an internal editorial preview.
6. Contact Callout with the verified internal Contact route.

The page composes only public Brand Patterns and Layout Primitives. Its six app-private section
components map typed product content to those APIs; the templates do not contain long editorial
strings. See [Home architecture](src/app/pages/home/README.md).

The next product milestone is PR 13 — About Page. It should replace only the localized About
placeholder and reuse the same typed-content, locale-link and public-pattern boundaries.

## Global shell

The shell composes only public Design System APIs:

- `gh-navigation` renders the brand, localized native links, exact active-page state, mobile menu,
  language actions and theme control.
- `gh-footer` renders localized identity, primary links, tagline and a static copyright.
- `LanguageSwitcherComponent` uses accessible EN/ES links and preserves the current path, query and
  fragment. A manual choice is stored under `gh-portfolio-locale` when browser storage is available.
- `ThemeSwitcherComponent` controls the public `GhThemeService` with Light, Dark and System options.
  The Design System owns `data-theme`, system preference observation and safe persistence.

LinkedIn, GitHub and email URLs are not present in the repository's approved source data. The
central `PORTFOLIO_CONFIG.urls` fields therefore remain empty and the footer does not publish fake
links. Add verified URLs there before exposing a social group.

## URL, locale and content

- **URL** is durable navigation state and determines the locale on direct load, refresh, history and
  SSR.
- **Locale Signal** is the in-memory projection of that validated URL prefix.
- **Content** is selected from the typed registry using that Signal.
- **Stored preference** records a manual choice for future product decisions but is deliberately not
  allowed to contradict the current URL.

`PortfolioLocaleStorageService` guards browser access, validates values and tolerates unavailable
storage. It is intentionally small and portfolio-specific.

## Accessibility and responsive behavior

- The localized skip link is the first focusable element and targets `main#main-content`.
- Header, navigation, main and footer use semantic landmarks and native links.
- Each route owns exactly one visible `h1`.
- Exact active navigation uses `aria-current="page"`; the language switcher separately marks the
  current locale.
- After client-side route changes, focus moves to the main content unless a fragment target was
  requested. Initial rendering is not disrupted.
- The Design System navigation owns Escape handling, focus return and responsive mobile state.
- Token-based CSS supports 320px through wide desktop layouts without viewport JavaScript.

## SSR, hydration and persistence

The route guard runs for server and browser navigation. It activates content and sets the Angular
`DOCUMENT` root language before the localized shell renders. English is used for `/` and invalid
locales on both platforms, so server HTML and the first client render agree. Browser globals and
storage are only accessed behind platform guards or the SSR-safe Design System service.

Theme defaults to `system` during SSR. A stored explicit theme is applied by `GhThemeService` in the
browser; there is no speculative inline pre-bootstrap script, so a brief theme transition can still
occur on a cold load. This avoids unsafe script duplication while preserving hydration-safe Angular
content.

## Current limits

- Home is complete; the other page bodies remain localized placeholders.
- Only English and Spanish are implemented.
- Experience details await a verified source and are intentionally not invented on Home.
- Social URLs await verified source data.
- Canonical URLs, complete `hreflang`, Open Graph, sitemap, structured data and production domain
  configuration belong to PR 18.
- No analytics, CMS, backend, contact form or deployment is included.

See [Portfolio internationalization](../../docs/portfolio-internationalization.md) for the detailed
locale contract and [architecture](../../docs/architecture.md) for workspace boundaries.
