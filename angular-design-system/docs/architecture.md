# Foundations architecture

## Source of truth

The repository-level `tokens/` directory defines the official primitives,
semantic aliases and light/dark theme values. The `design/` documentation
defines the intended visual character and usage.

The library SCSS is the runtime delivery layer. It maps source tokens to
namespaced custom properties instead of introducing a second token model.
There is intentionally no copied `tokens/` directory inside this workspace.

## Library boundaries

### `components/`

Standalone, reusable Angular UI primitives. A component belongs here only when
it has a stable public API, accessibility behavior, tests and token-only visual
styling.

### `patterns/`

Compositions of public components that solve a repeated product interaction or
layout problem. Patterns must not reach into component internals.

### `styles/`

Primitive variables, semantic theme mappings, global base styles and SCSS
mixins. CSS custom properties are prefixed with `--gh-` to avoid collisions in
consumer applications.

### `theming/`

Strongly typed Angular APIs for applying theme state. This layer owns document
attribute and persistence behavior; visual values remain in SCSS.

## Token layers

```text
Repository JSON and design docs
            ↓
SCSS primitive custom properties
            ↓
Light/dark semantic custom properties
            ↓
Components, patterns and showcase
```

Components must consume semantic properties for color and surfaces. Primitive
palette values are reserved for documentation, data visualization and approved
brand expressions.

## Showcase boundary

The showcase is a standalone Angular application and a consumer of the
library. It can contain documentation-specific layouts, but it must not become
the source of reusable design-system behavior.

## Testing strategy

- Library unit tests cover public Angular behavior such as theme state.
- Showcase unit tests cover documentation rendering and theme integration.
- Production builds validate Angular compilation and SCSS packaging.
- Accessibility automation and visual regression testing are recommended for
  the first component PR.
