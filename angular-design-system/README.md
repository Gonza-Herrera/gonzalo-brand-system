# Gonzalo Herrera Angular Design System

Official Angular workspace for the Gonzalo Herrera Design System.

This foundations release provides a reusable Angular library, a standalone
showcase application, token-driven SCSS, light and dark themes, and unit-test
configuration. It intentionally contains no product components.

## Requirements

- Node.js `^20.19.0`, `^22.12.0` or `>=24.0.0`
- npm 10 or newer

The workspace currently uses Angular 21 because it is the newest release line
compatible with the repository's Node.js 22.18 runtime.

## Workspace structure

```text
angular-design-system/
├── docs/
│   └── architecture.md
├── projects/
│   ├── gh-design-system/
│   │   └── src/
│   │       ├── lib/
│   │       │   ├── components/
│   │       │   ├── patterns/
│   │       │   ├── styles/
│   │       │   └── theming/
│   │       └── public-api.ts
│   └── showcase/
│       └── src/
└── README.md
```

## Install and run

```bash
cd angular-design-system
npm install
npm start
```

Open `http://localhost:4200`.

`npm start` builds the library first, then serves the showcase. When actively
editing TypeScript in the library, run `npm run watch:library` in a second
terminal so the showcase receives rebuilt library output.

## Build and test

```bash
npm run build
npm test -- --watch=false
```

Useful focused commands:

```bash
npm run build:library
npm run build:showcase
npm run watch:library
npm run watch:showcase
```

The production library output is written to `dist/gh-design-system`. The
showcase output is written to `dist/showcase`.

## Token and style consumption

The repository-level [`/tokens`](../tokens) directory remains the source of
truth. The library's SCSS maps those primitive and theme definitions to
namespaced CSS custom properties.

The showcase and installed consumers use the same package export:

```scss
@use 'gh-design-system/styles';
```

Global reset and base styles are deliberately opt-in:

```scss
@use 'gh-design-system/styles/foundations';
```

Components and applications should prefer semantic properties:

```scss
.example {
  padding: var(--gh-space-md);
  border: var(--gh-border-width-default) solid var(--gh-border-default);
  border-radius: var(--gh-radius-lg);
  background: var(--gh-surface-primary);
  color: var(--gh-text-primary);
  box-shadow: var(--gh-shadow-sm);
}
```

Reusable SCSS mixins are available separately:

```scss
@use 'gh-design-system/styles/mixins' as gh;

.example {
  @include gh.surface;
}
```

The SCSS under `styles/tokens/` and `styles/themes/` is generated from the
repository-level JSON:

```bash
npm run tokens:validate
npm run tokens:generate
npm run tokens:check
```

Generated files must never be edited manually.

## Theme consumption

Themes use the `data-theme` attribute on the root document element:

```html
<html data-theme="dark"></html>
```

Angular applications can use the exported service:

```ts
import { GhThemeService } from 'gh-design-system';

const themeService = inject(GhThemeService);
themeService.setTheme('dark');
themeService.toggleTheme();
```

The service persists explicit preferences in local storage. If no explicit
preference exists, the CSS foundations respect `prefers-color-scheme`.

Theme priority is explicit user preference, then system preference, then light
as the default.

## Consuming a local build

Build the library and install its output into another Angular project:

```bash
npm run build:library
cd ../consumer-app
npm install ../gonzalo-brand-system/angular-design-system/dist/gh-design-system
```

Then add `@use 'gh-design-system/styles';` and, if desired,
`@use 'gh-design-system/styles/foundations';` to the consumer's global SCSS.
Import public TypeScript APIs from `gh-design-system`.

## Scope

This release is deliberately limited to foundations:

- Primitive and semantic CSS custom properties
- Light and dark themes
- Opt-in global foundations and reusable SCSS mixins
- Deterministic JSON validation and SCSS generation
- A strongly typed Angular theme service
- A minimal standalone integration showcase

Button, Card, Hero and other product components are deferred to later work.
See [the architecture notes](docs/architecture.md) and
[tokens and themes guide](docs/tokens-and-themes.md) for contribution
boundaries.
