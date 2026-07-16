# Showcase

Internal Angular application for documenting and validating the Gonzalo Herrera
Design System.

## Responsibilities

- Foundation catalogue and design-token previews.
- Visual documentation for published components.
- Light, dark and system-theme validation.
- Responsive and accessibility reference implementation.
- Documentation host for future public components and patterns.

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

## Run

```bash
ng serve showcase
```

The library must be built first when using the CLI command directly:

```bash
ng build gh-design-system
ng serve showcase
```
