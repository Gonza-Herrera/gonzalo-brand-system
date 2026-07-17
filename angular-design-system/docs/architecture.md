# Design-system architecture

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

## Theme architecture

`GhThemeService` owns the framework-level behavior and supports `light`,
`dark` and `system`.

- `preference`: the stored user selection.
- `resolvedTheme`: the effective light or dark theme.
- Explicit preferences apply `data-theme`.
- System preference removes the attribute and follows `matchMedia`.
- Browser APIs are guarded for SSR.

The showcase theme toggle is an internal consumer of this public service.

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
- Production builds validate strict templates, lazy routes and public SCSS
  packaging.

## Build-cache trade-off

Angular's persistent disk cache remains disabled. Its native LMDB dependency
reproducibly aborts with a double-free on the current Node 22/macOS
environment. Re-evaluate after upgrading the Angular builder or Node runtime.
