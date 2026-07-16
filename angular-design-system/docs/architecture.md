# Foundations architecture

## Source of truth and generated output

The repository-level `tokens/` directory is the only editable token source.
`scripts/tokens.mjs` validates the JSON and deterministically generates the
library SCSS token and theme files.

```text
Repository JSON
      ↓ validate and generate
SCSS primitives + semantic contract + themes
      ↓ package
Consumer applications and future components
```

The generated files contain a header stating that they must not be edited
manually. `npm run tokens:check` compares their exact contents with current JSON
and runs before builds and tests.

## Style responsibilities

```text
styles/
├── tokens/        generated primitives, typography and semantic contract
├── themes/        generated light and dark mappings
├── foundations/   opt-in reset, base styles and utilities
├── _mixins.scss   reusable SCSS behavior
├── foundations.scss
└── index.scss
```

`gh-design-system/styles` is intentionally non-invasive: it exposes variables
and theme selectors without resetting the consumer application.

`gh-design-system/styles/foundations` is opt-in and applies the safe reset,
global typography, semantic body colors, focus-visible behavior and
reduced-motion handling.

## Library boundaries

- `components/`: future standalone UI primitives with stable APIs and tests.
- `patterns/`: proven compositions of public components.
- `styles/`: tokens, themes, foundations and mixins.
- `theming/`: Angular APIs for explicit theme state and persistence.

Future components must consume semantic color, surface, border, action, focus
and shadow variables. Primitive colors are limited to controlled brand
expressions; geometry may use spacing and radius primitives.

## Showcase boundary

The showcase imports the built package through the public `gh-design-system`
entry points. PR 2 includes only a smoke test for semantic background, text,
surface, borders, shadows and theme switching. The full foundations catalogue
is intentionally deferred to PR 3.

## Testing strategy

- Token validation checks JSON syntax, duplicate keys, names, references,
  cycles and theme coverage.
- Token synchronization checks generated SCSS deterministically.
- Library unit tests cover theme state.
- Showcase unit tests cover public-package integration and explicit switching.
- Production builds validate SCSS packaging and strict Angular compilation.

## Build-cache trade-off

Angular's persistent disk cache is disabled in `angular.json`. On the current
Node 22 and macOS environment, its native LMDB dependency reproducibly aborts
with a double-free after repeated application builds. Disabling only this cache
keeps builds deterministic and stable at the cost of slightly slower
incremental compilation. Re-evaluate the setting after upgrading the Angular
builder or Node runtime.
