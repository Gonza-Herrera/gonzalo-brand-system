# Showcase

Internal Angular application for documenting and validating the Gonzalo Herrera
Design System.

## Responsibilities

- Foundation catalogue and design-token previews.
- Visual documentation for published components.
- Light, dark and system-theme validation.
- Responsive and accessibility reference implementation.
- Documentation host for public components and Brand Patterns.

## Structure

- `core/`: navigation configuration and application models.
- `layout/`: shell, header and responsive sidebar.
- `pages/`: lazy-loaded foundation and component documentation routes.
- `shared/components/`: documentation-only UI such as theme and code previews.
- `shared/data/`: generated token metadata.
- `shared/styles/`: internal SCSS mixins.

Nothing in this project is part of the public `gh-design-system` API.
Pages such as `/buttons` must import the real component from the package rather
than recreating it with showcase-only markup.

Current public documentation routes include `/layout`, `/buttons`, `/badges`,
`/tags`, `/cards`, `/forms` and `/patterns`.

The Layout page exercises all seven public primitives, including real Project Cards inside Grid and
real Tags and Badges inside Cluster. Its Floating Layout integration demo composes Ambient
Background, Navigation, transparent Main, Hero and the first Section on one continuous canvas.

The Patterns page exercises all eight Brand Patterns in isolation and includes
a composed personal-landing demonstration built from the public package API.
Its Navigation section documents the refined floating Header, multi-layer light, active items,
projected Language and Theme selectors, mobile disclosure, ambient integration, solid fallback and
performance boundaries. Its Motion Guidelines section demonstrates Hover, Pressed, Active, Focus
and Selector continuity with reduced-motion and forced-colors degradation. The Showcase shell
remains the real Side Navigation and Skip Link consumer; no public Tabs, Breadcrumbs or Pagination
are implied.

## Run

```bash
ng serve showcase
```

The library must be built first when using the CLI command directly:

```bash
ng build gh-design-system
ng serve showcase
```
