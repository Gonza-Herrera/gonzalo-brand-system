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
│   ├── en/                  complete English shell and placeholder copy
│   ├── es/                  equivalent Spanish structure
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
workspace has no existing environment convention and no production URL is approved.

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
- Portfolio tests cover its minimal root, bilingual shell, public Navigation
  and Footer integration, all localized lazy routes, redirects, invalid-locale
  fallback, exact active state, content parity, locale storage, both switchers,
  localized Not Found, document language, titles and basic descriptions.
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
