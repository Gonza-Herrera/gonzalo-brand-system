# Portfolio

`portfolio` is Gonzalo Herrera's bilingual, SSR-enabled public website application. It is separate
from the technical Showcase and Storybook documentation: Portfolio owns real content, localized
routing and product concerns; Showcase validates integration; Storybook documents reusable APIs.

The current release includes complete Portfolio Home, About, Experience, Projects, Content Hub and
Contact pages, the first full bilingual Project Case Study and three bilingual internal content
details on top of the global shell, routing and internationalization foundation. Contact includes a
lazy Web3Forms integration. Localized technical SEO includes canonical and alternate URLs, Open
Graph, Twitter/X Cards, Person and WebSite JSON-LD, a social image, robots and sitemap generation.

## Run, build and test

From `angular-design-system/`:

```bash
npm run start:portfolio
npm run build:portfolio
npm run test:portfolio
npm run build:ssr:portfolio
npm run seo:check
```

The development server uses `http://localhost:4200`. The production build emits browser and server
bundles with hydration. After building, `npm run serve:ssr:portfolio` serves them at
`http://localhost:4000` by default and respects the host-provided `PORT` variable.

The SSR host allowlist includes only `localhost` and `127.0.0.1` for local verification. Add the
approved production hostname to `security.allowedHosts` as part of deployment configuration; do not
disable Angular's host validation.

## Localized routes

English (`en`) is the default locale and Spanish (`es`) is the only other supported locale. Every
public page has both route variants:

| Page           | English              | Spanish              |
| -------------- | -------------------- | -------------------- |
| Home           | `/en`                | `/es`                |
| About          | `/en/about`          | `/es/about`          |
| Experience     | `/en/experience`     | `/es/experience`     |
| Projects       | `/en/projects`       | `/es/projects`       |
| Project detail | `/en/projects/:slug` | `/es/projects/:slug` |
| Content        | `/en/content`        | `/es/content`        |
| Content detail | `/en/content/:slug`  | `/es/content/:slug`  |
| Contact        | `/en/contact`        | `/es/contact`        |
| Not Found      | `/en/**`             | `/es/**`             |

Routing is deterministic and safe for direct SSR requests:

- `/` redirects to `/en`.
- Known legacy paths such as `/about` and `/projects` redirect to their English equivalents.
- An invalid locale keeps the remaining path and falls back to English: `/fr/about` becomes
  `/en/about`.
- Unknown pages under a valid locale render the localized 404 inside the shared shell and return
  HTTP 404 from the SSR server.

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
`pageId` route data selects localized SEO through `PortfolioTitleStrategy` and `SeoService`.
Project and Content details additionally resolve their stable slug to localized metadata, including
explicit non-indexable invalid-slug results. See
[Portfolio SEO and social metadata](../../docs/portfolio-seo.md).

## Typed content

All copy is compile-time TypeScript under `src/app/content/`:

```text
content/
├── models/                         shared readonly contracts and stable IDs
├── en/home.content.ts              complete English Home
├── en/about.content.ts             complete English About
├── en/experience.content.ts        complete English Experience
├── en/projects.content.ts          English project registry and Case Study
├── en/content-hub.content.ts       English lightweight Content Hub registry
├── en/content-details.content.ts   English internal article bodies
├── en/contact.content.ts           complete English Contact content
├── es/home.content.ts              equivalent Spanish Home
├── es/about.content.ts             equivalent Spanish About
├── es/experience.content.ts        equivalent Spanish Experience
├── es/projects.content.ts          equivalent Spanish project registry and Case Study
├── es/content-hub.content.ts       equivalent Spanish Content Hub registry
├── es/content-details.content.ts   equivalent Spanish article bodies
├── es/contact.content.ts           equivalent Spanish Contact content
├── utils/experience-card.mapper.ts shared pure Timeline and preview adapters
├── utils/project-card.mapper.ts    shared pure Project Card adapter
├── utils/project-selectors.ts      ordering, featured, related and slug helpers
├── utils/content-selectors.ts      published, featured, filter, related and slug helpers
├── utils/article-card.mapper.ts    Content to Article Card/Highlight adapter
├── utils/contact-channel.mapper.ts verified Contact destination adapter
├── content-details.registry.ts     locale-to-detail registry loaded with Content Detail
├── contact-content.registry.ts     locale-to-Contact registry loaded with Contact
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
3. Selected Projects derived from the canonical registry; Angular Design System is currently the
   only featured item and links to its localized Case Study.
4. Experience Preview derived from the three most recent canonical professional records.
5. Featured Content with an internal editorial preview.
6. Contact Callout with the verified internal Contact route.

The page composes only public Brand Patterns and Layout Primitives. Its six app-private section
components map typed product content to those APIs; the templates do not contain long editorial
strings. See [Home architecture](src/app/pages/home/README.md).

## About page

`/en/about` and `/es/about` render a shared nine-section structure with localized content:

1. About Hero.
2. Professional Story with an Experience transition.
3. Engineering Philosophy.
4. Leadership Approach.
5. AI-Augmented Engineering.
6. Core Principles.
7. Technical Focus.
8. Contact Callout.

The page reuses Hero, Section Heading, Feature Grid and Contact Callout Brand Patterns plus public
Container, Section, Stack, Grid, Cluster, Card and Tag APIs. Its content models use stable IDs and
parity tests across locales. All internal actions are resolved from `pageId` through the shared
locale-link helper.

No portrait, metrics or external profile links are shown because no approved source for those
values exists in the repository. Employer history remains owned by Experience rather than
duplicated on About. See the [About architecture](src/app/pages/about/README.md) for maintenance and
content rules.

## Experience page

`/en/experience` and `/es/experience` render the same eight-section structure with localized copy:

1. Experience Hero.
2. Career Summary.
3. Professional Timeline.
4. Leadership and Engineering Impact.
5. Ways of Working.
6. Selected Capabilities.
7. Career Direction with a localized Projects transition.
8. Contact Callout with localized Contact and Projects actions.

Experience reuses the public Hero, Section Heading, Feature Grid, Experience Timeline, Experience
Card and Contact Callout patterns plus public layout and content primitives. A pure mapper adapts the
Portfolio editorial model to `GhExperienceCardData`; a pure selector derives Home's first three
records from the same canonical locale collection by explicit editorial order without mutation.

The canonical English and Spanish registries contain five approved experiences: ICBC, Endava,
Vortex, Develative Frontend Developer and Develative Project Manager. Each record owns stable
identity, order, localized periods and paragraphs, responsibilities, technologies or capabilities
and explicit current state. ICBC is current. Home reuses the same source for ICBC, Endava and
Vortex; it does not maintain duplicate professional content. See the
[Experience architecture](src/app/pages/experience/README.md).

## Projects and Case Studies

`/en/projects` and `/es/projects` render the same four-entry editorial catalogue in stable `order`:

1. `angular-design-system` — in progress; complete bilingual Case Study.
2. `ai-code-review-assistant` — concept; concise overview only.
3. `angular-accelerator-kit` — concept; concise overview only.
4. `ai-toolkit-for-developers` — concept; concise overview only.

The canonical localized registry owns IDs, slugs, status/category values, visible labels,
technologies, optional links/images and case-study data. Pure selectors derive the editorial grid,
related projects and the Home featured preview. A pure mapper adapts those records to the public
`GhProjectCardData` API and exposes a localized detail link only for an available Case Study.

Project Detail is a lazy route. Angular Design System renders Summary, Context, Problem, Goals,
Constraints, Role, Approach, Architecture, Key Decisions, Implementation, Challenges, Results,
Lessons, Next Steps, Related Projects and Contact. Empty optional values are not rendered. Valid
concept slugs render an honest reduced overview, while an invalid slug renders localized Project
Not Found content inside the shell without redirecting.

Projects composes public Hero, Section Heading, Project Card, Card, Badge, Tag, Contact Callout and
Layout APIs. The library gained only optional backwards-compatible Project Card category, intrinsic
image dimensions and safe external-link fields; all case-study composition remains
Portfolio-specific. The four-project catalogue does not include filters because the added control
would not improve scanning at its current size.

No project screenshot, client, date, metric, live demo or external repository link is published.
Those fields remain absent because the approved content source does not substantiate them. See the
[Projects architecture](src/app/pages/projects/README.md) and
[case-study content rules](../../docs/portfolio-case-studies.md).

## Content Hub

`/en/content` and `/es/content` render a Hero, one featured item, accessible topic filters, the
published Article Card grid, a defensive localized empty state and the Contact Callout. The
canonical registry contains four stable entries:

1. `angular-14-vs-angular-20` — published internal article with comparison and code sections.
2. `lessons-from-code-reviews` — published internal leadership article.
3. `building-ai-agents` — published internal guide and the single featured item.
4. `signals-forms-vs-reactive-forms` — planned and intentionally absent from production views.

The three available detail routes render typed text, list, callout, code and comparison sections,
Key Takeaways, Tags, Related Content and Contact. Unknown, planned or unavailable slugs render
localized Content Not Found without redirecting. Home Featured Content derives the same
`building-ai-agents` registry object and links directly to its localized detail.

All current destinations are internal. LinkedIn and other publication URLs, dates, reading times,
images, downloads and metrics remain omitted because no approved source confirms them. Full bodies
are bundled with the lazy Content Detail route instead of the initial Portfolio bundle. Content
composes the public Hero, Content Highlight, Article Card, Badge, Tag, Card, Contact Callout and
Layout APIs; one backwards-compatible Article Card extension adds optional type, topics, image
dimensions, machine-readable date and localized labels/heading level.

See the [Content Hub architecture](src/app/pages/content/README.md) and
[editorial guidelines](../../docs/portfolio-content-guidelines.md).

## Contact page

`/en/contact` and `/es/contact` render a Hero, six conversation topics, configured contact channels,
a typed message form, privacy/security guidance and localized cards for Experience, Projects and
Content. The verified LinkedIn destination is centralized in `PORTFOLIO_CONFIG.urls` and opens
through the Design System external-link pattern; labels and descriptions remain localized. Stable
highlight, topic and channel IDs keep both locales structurally aligned.

Web3Forms is the approved and configured form provider. Contact loads its `HttpClient(withFetch)` provider and
`ContactService` with the lazy route, maps an explicit JSON payload and handles idle, submitting,
success, error and unavailable states. Provider failures still show safe localized feedback.

The form contract includes Name, Email, Subject, Message and an off-screen `botcheck` honeypot. Pure
validators enforce required, whitespace, trimmed minimum and centralized maximum rules. The
provider mapper trims boundary whitespace without mutation. Duplicate requests are blocked; success
resets the form and error preserves input.

Contact composes the public Hero, Section Heading, Feature Grid, Card and Button APIs plus Container,
Section and Stack primitives. Native inputs and textarea are styled locally with semantic tokens
because no general Design System form controls exist. The full Contact content and Angular Forms
code remain in the lazy Contact chunk.

### Configure Web3Forms

1. Register the recipient email in Web3Forms and obtain an access key.
2. Supply or rotate that public key through the centralized `CONTACT_FORM_CONFIG` source.
3. Add a verified direct fallback as `PORTFOLIO_CONFIG.urls.email = 'mailto:…'`.
4. Build and run the Portfolio.
5. Perform one real test and confirm receipt.

The repository has no `.env` or runtime-config pipeline. Never commit SMTP credentials or private
server secrets. The browser-visible Web3Forms access key is public by provider design.

See the [Contact page architecture](src/app/pages/contact/README.md) and
[Contact form contract](../../docs/portfolio-contact-form.md).

## Global shell

The shell composes only public Design System APIs:

- `gh-navigation` renders the brand, localized semantic links, exact active-page state, mobile menu,
  language actions and theme control. Portfolio opts into its router-agnostic internal-navigation
  output and resolves those URLs through Angular Router, preventing full-document reloads.
- `gh-footer` renders localized identity, primary links, tagline and a static copyright.
- `LanguageSwitcherComponent` uses accessible EN/ES links and preserves the current path, query and
  fragment. A manual choice is stored under `gh-portfolio-locale` when browser storage is available.
- `ThemeSwitcherComponent` controls the public `GhThemeService` with Light, Dark and System options.
  The Design System owns `data-theme`, system preference observation and safe persistence.

LinkedIn is the only verified public profile and is centralized in `PORTFOLIO_CONFIG.urls`. GitHub
and email remain unconfigured and are not invented.

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
- Header, navigation, main and footer use semantic landmarks and real links. Header links preserve
  their `href` while primary in-app clicks use Angular Router; modified and external clicks retain
  native browser behavior.
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

- Home, About, Experience, Projects, Content and Contact are complete.
- Angular Design System is the only complete Case Study; the other project entries remain explicitly
  labelled concepts until implementation evidence exists.
- Only English and Spanish are implemented.
- Professional history is limited to the five approved records; employer links, logos, clients,
  metrics and confidential project detail remain intentionally omitted.
- LinkedIn is configured; email and GitHub remain absent until verified.
- Content has no external publications, editorial dates, reading times or images until approved
  source data exists; one planned forms comparison remains unpublished.
- The SEO base URL remains the explicit `https://portfolio.example` placeholder until the production
  domain is approved; regenerate robots and sitemap after changing it.
- The generated default social image requires final visual approval before production.
- The production SSR hostname must be approved and added to the host allowlist before deployment.
- No analytics, CMS, custom contact backend or deployment is included. Web3Forms submission is
  implemented, but remains unavailable until a deployment supplies its public access key. Messages
  are never persisted in browser storage or logged.

See [Portfolio internationalization](../../docs/portfolio-internationalization.md) for the detailed
locale contract and [architecture](../../docs/architecture.md) for workspace boundaries.
