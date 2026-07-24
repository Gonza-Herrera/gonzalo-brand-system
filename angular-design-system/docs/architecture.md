# Design-system architecture

## System layers

```text
Design Tokens
    ↓
Themes and Foundations
    ↓
Components
    ↓
Layout Primitives
    ↓
Brand Patterns
    ↓
Portfolio / Showcase / Consumer Applications
```

Tokens and themes establish the shared contract. Components own focused UI
semantics. Layout Primitives compose spatial relationships. Brand Patterns
combine those public APIs into configurable page structures. Portfolio is the
public product; Showcase and consumer applications prove routed integration;
Storybook documents every reusable layer in isolation.

## Source of truth and generated output

The repository-level `tokens/` directory is the only editable token source.
`scripts/tokens.mjs` validates JSON and deterministically generates:

- Library SCSS primitives, typography, semantic contract and themes.
- Typed foundation data consumed by the showcase catalogue.

```text
Repository JSON
      ↓ validate and generate
Library SCSS + showcase TypeScript data
      ↓
Public package and documentation routes
```

`npm run tokens:check` runs before builds and tests.

## Library component responsibilities

```text
components/
├── badge/
├── button/
├── cards/
│   ├── card/
│   ├── article-card/
│   ├── experience-card/
│   └── project-card/
└── tag/

layout/
├── cluster/
├── container/
├── divider/
├── grid/
├── inline/
├── section/
└── stack/

patterns/
├── hero/
├── navigation/
├── footer/
├── section-heading/
├── feature-grid/
├── experience-timeline/
├── content-highlight/
└── contact-callout/
```

Public components are standalone, strictly typed, SSR-safe and exported only
through `src/public-api.ts`. Each component owns encapsulated styles and
colocated behavioral tests. Button keeps native form semantics by rendering a
real `<button>` and relying on the native bubbling `click` event rather than a
redundant Angular output. Badge remains non-interactive. Tag selects between
static, selectable and removable native semantics without combining those
responsibilities. Specialized Cards compose the foundational Card, Badge and
Tag rather than using Angular class inheritance.

Visual families use composition and shared tokens, not Angular class
inheritance. This keeps standalone imports explicit and prevents component
lifecycle or private implementation from becoming an accidental contract.

Layout Primitives are standalone and presentational. Container, Stack, Inline,
Grid and Cluster apply layout directly to their custom-element host to avoid an
extra wrapper. Section renders a real `<section>`. Divider chooses decorative
markup, native `<hr>` or explicit vertical separator semantics. Responsive
behavior is CSS-only and fixed Grid variants share breakpoints generated from
the repository token source.

Brand Patterns are standalone, configurable compositions. Hero and Contact
Callout compose Section, Container, Stack and Inline; Navigation and Footer use
Container; Feature Grid delegates to Grid and Card; Experience Timeline reuses
Experience Card; Content Highlight composes Card, Badge, Tag, Stack and Cluster.
Patterns contain no business logic, personal copy, router dependency or
viewport JavaScript.

Navigation preserves semantic anchors and remains router-agnostic. Consumers may opt into its
`internalNavigate` output to intercept unmodified primary clicks and delegate authored URLs to their
application router. Portfolio uses this contract to avoid full-document reloads while modified and
external clicks keep native behavior.

## Library style responsibilities

```text
styles/
├── tokens/        generated primitives, typography and semantic contract
├── themes/        generated light and dark mappings
├── foundations/   opt-in reset, base styles and utilities
├── _mixins.scss   reusable SCSS behavior
├── foundations.scss
└── index.scss
```

`gh-design-system/styles` exposes variables and themes without resetting the
consumer. `gh-design-system/styles/foundations` applies the safe opt-in reset
and accessible global base styles.

## Portfolio architecture

Portfolio is a separate Angular application because the public website has
different responsibilities from the internal integration Showcase. It owns
real bilingual content, localized routing, SSR, hydration and future SEO,
analytics and deployment concerns. Showcase remains free to prioritize technical
examples and maintainer workflows.

```text
portfolio/src/app/
├── app.component.*          minimal root RouterOutlet
├── core/
│   ├── config/              non-translatable site and locale configuration
│   ├── routing/             locale guard, URL helpers and title strategy
│   └── services/            locale Signal and safe preference storage
├── content/
│   ├── models/              readonly content contracts
│   ├── en/                  English shell, complete pages, projects and content details
│   ├── es/                  equivalent Spanish structure and editorial parity
│   └── registry             typed locale-to-content mapping
├── layout/
│   └── portfolio-shell/     global Navigation, main and Footer
├── pages/                   lazy standalone route components
├── shared/                  app-private language and theme controls
└── styles/                  minimal app-level layout contract
```

`AppComponent` only renders the root `RouterOutlet`. The `:locale` parent route
validates `en` or `es` before rendering `PortfolioShellComponent`. The shell
owns the localized skip link, public `GhNavigationComponent`,
`main#main-content`, public `GhFooterComponent` and the full-height frame. Home,
About, Experience, Projects, Content, Contact and Not Found load through
`loadComponent`; the localized fallback stays inside the shell.

```text
Localized route
    ↓
Locale validation
    ↓
Locale Service
    ↓
Typed content registry
    ↓
Portfolio Shell
    ↓
Localized page
```

The locale prefix is the source of truth. `/` and known unlocalized routes
redirect to English. An invalid prefix falls back to `en` while preserving the
remaining path. The route guard activates `PortfolioLocaleService`, which
updates the locale Signal, selects compile-time content and sets `<html lang>`
on server and browser documents. A safe, app-specific storage service records
manual language choices but never overrides an explicit URL.

Stable route `pageId` metadata feeds `PortfolioTitleStrategy`, which applies
the matching localized title and basic description. Content remains typed
TypeScript, separate from templates and structurally equivalent across both
locales; there is no CMS, HTTP loader, translation dependency or state manager.

Home is the first complete product page. Its runtime flow remains explicit and
deterministic:

```text
Localized route (/en or /es)
    ↓
PortfolioLocaleService
    ↓
Localized Home content (EN_HOME_CONTENT or ES_HOME_CONTENT)
    ↓
Home Page composition and app-private sections
    ↓
Public Brand Patterns
    ↓
Public Layout Primitives and Components
    ↓
Design Tokens and Themes
```

`HomePage` only orchestrates Hero, Expertise, Selected Projects, Experience
Preview, Featured Content and Contact Callout sections. The section components
adapt typed content and localized links to public pattern inputs. They do not
duplicate general-purpose cards or layout behavior. The only library extension
needed by Home is a backwards-compatible Project Card heading-level and label
contract, which preserves correct `h2`/`h3` hierarchy and allows accessible
strings to be localized.

Home source data is intentionally conservative: project concepts are labelled, professional history
is derived from the approved canonical Experience registry, and unverified social or publication
URLs are omitted. This constraint belongs to the content layer rather than the reusable patterns.

About follows the same typed-content boundary with a deeper editorial composition:

```text
Localized About content (EN_ABOUT_CONTENT or ES_ABOUT_CONTENT)
    ↓
PortfolioLocaleService
    ↓
About Page composition and app-private sections
    ↓
Public Brand Patterns and Layout Primitives
    ↓
Design Tokens and Themes
```

`AboutPage` orchestrates Hero, Professional Story, Engineering Philosophy, Leadership,
AI-Augmented Engineering, Core Principles, Technical Focus, Working Style and Contact. A shared
app-private feature-section adapter covers structurally identical content blocks; distinct sections
remain separate when they own narrative paragraphs, derived localized links or technical Tags.
Stable IDs keep EN/ES collections aligned while all visible text remains in locale modules.

About does not extend the public Design System. Its local styles are limited to reading measure and
editorial composition, and every visual value consumes the existing semantic token contract. The
absence of browser APIs, runtime IDs and dynamic ordering keeps direct `/en/about` and `/es/about`
SSR output deterministic.

Experience adds a typed editorial adapter between localized professional content and the reusable
Timeline/Card contract:

```text
Localized Experience content
    ↓
PortfolioLocaleService
    ↓
Pure Experience Card mapper
    ↓
Experience Timeline and Cards
    ↓
Home preview selector (first three, editorial order)
    ↓
Portfolio Experience and Home pages
```

`ExperiencePage` orchestrates Hero, Career Summary, Professional Timeline, Leadership Impact, Ways
of Working, Capabilities, Career Direction and Contact. Stable IDs maintain EN/ES parity. The
Timeline consumes dates exactly as authored and owns the semantic ordered list; no page code parses,
sorts or calculates tenure.

Home imports the same locale-specific professional collection and derives its preview through
`selectExperiencePreview`. This keeps IDs, company, role, period, current state and order consistent
without a second source of truth. The canonical collections contain the same five stable IDs in
English and Spanish, use explicit `order` values and mark ICBC as the only current record.

Experience required one minimal backwards-compatible public-library extension:
`GhExperienceCardData` now accepts ordered description paragraphs and a separate capabilities
collection, while the optional localized capabilities label preserves existing consumers.
Responsibilities and achievements remain semantic lists; technologies and capabilities render as
distinct Tag groups; and a Timeline placed under a section `h2` exposes role headings as `h3`.

Experience local styles are limited to editorial measure, Hero composition and token-based layout.
Signals, pure mapping and the absence of browser APIs, generated IDs or dynamic dates keep direct
`/en/experience` and `/es/experience` SSR output deterministic.

Projects introduces a canonical localized project registry shared with Home:

```text
Localized project registry
    ↓
Project selectors and pure Project Card mapper
    ├──→ Featured projects selector → Home preview
    ↓
Projects Grid
    ↓
Localized /projects/:slug route
    ↓
Project Detail resolver
    ↓
Case Study composition or concept overview
    ↓
Related Projects and Contact
```

Stable IDs, untranslated slugs, status/category values and editorial order live in the typed project
model. English and Spanish registries keep structural parity while localizing all visible labels and
narrative content. `selectFeaturedProjects` supplies Home with the same project object references;
`selectRelatedProjects` ranks deterministic category/technology overlap; `mapProjectToCard` emits a
localized detail URL only when the case study is available.

The detail route is lazy loaded and receives `slug` through Angular's component input binding. The
URL remains authoritative for locale and project identity, so the existing Language Switcher keeps
the slug automatically. `PortfolioTitleStrategy` resolves localized project metadata and an explicit
invalid-slug fallback without page-level Title or Meta services.

Angular Design System is the only complete Case Study supported by repository evidence. The other
three entries remain concepts and render a reduced overview when their stable URL is entered
manually. The catalogue does not link to those incomplete details, publish unverified external URLs
or render empty editorial sections. No filter is present because four items remain directly
scannable.

Project Detail explicitly composes typed Summary, Context, Problem, Goals, Constraints, Role,
Approach, Architecture, Decisions, Implementation, Challenges, Results, Lessons and Next Steps. A
small reusable text/list section covers the repeated editorial shape; the application does not use
dynamic components, `any` or a generic CMS renderer. Architecture and approach diagrams use
semantic ordered lists and token-driven CSS rather than a runtime diagram library.

Projects required one backwards-compatible Design System extension: `GhProjectCardData.category`
is an optional visible Badge, intrinsic image dimensions reserve media space, and explicit
project/repository external flags provide safe new-tab attributes. Routing, locale, content,
metadata and case-study structure remain Portfolio responsibilities. Pure transforms, authored order
and the absence of browser globals, dynamic dates or random values keep `/en/projects`,
`/es/projects` and all detail variants deterministic for SSR and hydration.

Content introduces a lightweight localized catalogue plus lazy editorial bodies shared with Home:

```text
Localized Content Hub registry
    ↓
Published content selectors
    ├──→ Featured selector → Home Featured Content
    ↓
Content Highlight and Article Card Grid
    ↓
Localized /content/:slug route
    ↓
Lazy localized detail registry
    ↓
Typed editorial sections
    ↓
Related Content and Contact
```

Stable IDs and untranslated slugs identify four bilingual records. Three are published internal
items; one planned forms comparison remains excluded from production. `selectPublishedContent`,
`selectFeaturedContent`, `filterContent`, `findContentBySlug` and `selectRelatedContent` preserve
authored order and never mutate the registry. The same featured registry object feeds Home and the
Hub, removing the previous independent preview.

Hub summaries remain part of localized site content, while the larger EN/ES detail registries are
imported only by the lazy Content Detail page. This keeps the initial browser bundle within its
budget without adding HTTP, Observables, a CMS or a Markdown runtime. The detail renderer handles a
closed union of text, list, callout, code and comparison sections through explicit Angular control
flow. It never uses `innerHTML`; code stays escaped and wide code/tables scroll locally.

Content required one backwards-compatible Design System extension. Article Card now accepts
optional content type, topics, intrinsic image dimensions and machine-readable publication date,
plus localized labels and an `h2 | h3` heading input. Portfolio routing, locale, source validation,
filters and editorial detail stay application-specific. No external item, publication date, reading
time, image or metric is currently exposed because the approved repository source does not confirm
one. Static ordering, locale-first lookup and the absence of browser/runtime values keep Hub and
detail SSR output deterministic.

Contact uses a lazy localized content registry, a verified channel mapper and a configuration-safe
submission boundary:

```text
Localized Contact route
    ↓
Lazy EN/ES Contact content
    ↓
Contact Page
    ├──→ PORTFOLIO_CONFIG.urls → verified LinkedIn channel
    ├──→ Typed Reactive Form → Web3Forms when configured
    └──→ localized Experience / Projects / Content links
```

The approved LinkedIn profile is stored once in central configuration and resolved against the
stable `linkedin` descriptor in both locales. Unconfigured email and GitHub channels remain omitted,
and the localized empty state remains available when no destination resolves. External channel links
use the shared Feature Grid pattern for native keyboard access, safe new-tab attributes and
accessible external-link labeling.

Web3Forms is the approved form provider and its browser-visible public access key is centralized in
configuration. Invalid configuration still initializes `unavailable` feedback and does not
construct a request, persist draft data or log values.

Contact owns stable highlight, topic and channel IDs, field labels, validation messages, submission
status copy and privacy guidance in structurally equivalent EN/ES modules. Angular Forms, the full
localized content and native-field styles stay inside the lazy Contact route. The Design System is
unchanged: Contact composes public Hero, Section Heading, Feature Grid, Card, Button and Layout APIs;
native form controls remain application-specific until a reusable form-control system is designed
as a separate concern.

`nonWhitespaceValidator` and `normalizeContactFormValue` are pure. The normalized payload trims
boundaries and preserves email case, Unicode and message line breaks. The component owns submission
states, duplicate prevention, error mapping and first-invalid-field focus. Server validation, rate
limiting and spam protection remain provider responsibilities.

Production statistics keep the complete Contact page, localized copy and Angular Forms runtime in a
dedicated lazy chunk. Lightweight shell metadata and route-local content reduce the initial browser
bundle to 452.91 kB. The Portfolio-only initial budget is a 500 kB warning and 550 kB error;
Showcase budgets are unchanged. See the
[performance and accessibility audit](../projects/portfolio/docs/performance-accessibility.md).

Portfolio consumes TypeScript only from `gh-design-system` and Sass only from
the public `styles` and `styles/foundations` exports. The application
initializer instantiates the library's SSR-safe `GhThemeService`. The
app-private Theme Switcher binds localized labels to the public light, dark and
system contract without duplicating browser or storage logic.

```text
Theme preference
    ↓
Theme Service
    ↓
Resolved light/dark theme
    ↓
Design System tokens
```

The Language Switcher is also app-private because it owns Portfolio route
semantics. It preserves the current path, query and fragment while replacing
the locale prefix. These routing and preference controls are not exported by
the Design System.

The official Angular SSR builder produces browser and Express server bundles.
`provideClientHydration(withEventReplay())` hydrates server HTML, while all
routes use server rendering. URL-first locale resolution keeps server and
first-client content deterministic. No environment files were introduced: the
workspace has no existing environment convention and no production URL is approved. The build
security allowlist contains only `localhost` and `127.0.0.1`, which enables real local SSR checks
without disabling Angular's host validation; deployment must add the approved production hostname.

## Showcase architecture

```text
app/
├── core/
│   ├── config/
│   └── models/
├── layout/
│   ├── showcase-header/
│   ├── showcase-shell/
│   └── showcase-sidebar/
├── pages/
│   ├── overview/
│   ├── colors/
│   ├── typography/
│   ├── spacing/
│   ├── radii/
│   ├── shadows/
│   ├── layout/
│   ├── buttons/
│   ├── badges/
│   ├── tags/
│   ├── cards/
│   └── patterns/
└── shared/
    ├── components/
    ├── data/
    └── styles/
```

Pages are lazy-loaded standalone components. Navigation configuration is
centralized. Shared documentation components remain private to the showcase
and are never exported from `gh-design-system`.

The showcase imports the built package through:

```scss
@use 'gh-design-system/styles';
@use 'gh-design-system/styles/foundations';
```

## Storybook architecture

```text
.storybook/                 framework, global themes, viewports and addons
stories/foundations/        central token references
stories/compositions/       small public-API integration examples
stories/shared/             deterministic demonstration data
src/lib/**/*.stories.ts     colocated component, layout and pattern stories
docs/introduction.mdx       Storybook landing page
```

Storybook builds the library first and imports components from the generated
public package, matching an external consumer. The Angular builder loads the
real public style entrypoints and reuses the Showcase public asset directory;
tokens and images are not copied into Storybook.

The global theme decorator applies the same `data-theme` attribute as the
library. Neutral viewports cover 320, 375, 768, 1024 and 1440 pixels. Compodoc
feeds Angular inputs and outputs to Autodocs. The accessibility addon is
configured to surface failures, and small `play` functions cover only
high-value interactions.

Storybook is the canonical isolated visual/API reference. Showcase remains
the routed integration demonstration and landing application; neither surface
is intended to duplicate the other completely.

Portfolio is not a third documentation surface. It is the public product and
will progressively replace placeholders with real localized experiences.

## Theme architecture

`GhThemeService` owns the framework-level behavior and supports `light`,
`dark` and `system`.

- `preference`: the stored user selection.
- `resolvedTheme`: the effective light or dark theme.
- Explicit preferences apply `data-theme`.
- System preference removes the attribute and follows `matchMedia`.
- Browser APIs are guarded for SSR.

The showcase theme toggle is an internal consumer of this public service.
Portfolio exposes an app-private select using the same public service. Locale
selection and theme selection persist independently; only locale remains part
of the route.

## Testing strategy

- Token validation checks syntax, duplicate keys, names, references, cycles and
  theme coverage.
- Library tests cover explicit, stored, system and SSR theme behavior.
- Button tests cover projection, typed inputs, native form behavior, disabled
  and accessible loading states.
- Badge tests protect non-interactive semantics, variants, appearances, sizes
  and indicator projection.
- Tag tests cover static, native selectable and accessible removable behavior,
  including disabled and event propagation.
- Card tests cover projection, visual variants and non-interactive base
  semantics.
- Specialized Card tests cover native navigation, optional media, semantic
  lists, typed models and composition with Badge and Tag.
- Layout tests cover typed host classes, content projection, semantic Section
  and Divider markup, wrapping defaults and responsive Grid variants.
- Pattern tests cover semantic native links, mobile Navigation state, heading
  levels, optional content, external-link safety, public composition and empty
  collections.
- Showcase tests cover all routes, active navigation, wildcard redirect,
  mobile menu behavior, accessible theme selection, public component
  integration, real Card/Tag/Badge composition within Layout Primitives and the
  complete Brand Patterns landing demonstration.
- Portfolio tests cover its minimal root, bilingual shell, public Navigation and Footer integration,
  the complete bilingual Home, About, Experience, Projects, Content and Contact compositions, section
  adapters, localized links, stable IDs/translations, Experience/Project/Content mapping and
  selection, Home-preview consistency, Project/Content Detail and invalid slugs, accessible content
  filters, typed editorial sections, Contact validators/normalization/unavailable state, all localized lazy routes, redirects, invalid-locale fallback,
  exact active state, content parity, locale storage, both switchers, localized Not Found, document
  language, titles and basic descriptions.
- Portfolio's production build validates server rendering, hydration wiring,
  direct lazy-route compatibility and separate route chunks.
- Storybook build-time checks compile every public story and MDX page against
  the same styles and assets as consumers. Its test runner executes targeted
  interactions and story-level accessibility checks against a running server.
- Production builds validate strict templates, lazy routes and public SCSS
  packaging.

## Build-cache trade-off

Angular's persistent disk cache remains disabled. Its native LMDB dependency
reproducibly aborts with a double-free on the current Node 22/macOS
environment. Re-evaluate after upgrading the Angular builder or Node runtime.
