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

Workspace projects load the library source through the configured SCSS include
path:

```scss
@use 'styles/index';
```

Installed consumers use the package export:

```scss
@use 'gh-design-system/styles';
```

Components and applications should prefer semantic properties:

```scss
.example {
  padding: var(--gh-space-md);
  border: 1px solid var(--gh-color-border-default);
  border-radius: var(--gh-radius-lg);
  background: var(--gh-color-surface-card);
  color: var(--gh-color-text-primary);
  box-shadow: var(--gh-shadow-sm);
}
```

Reusable SCSS mixins are available separately:

```scss
@use 'gh-design-system/styles/mixins' as gh;

.example {
  @include gh.card;
}
```

## Theme consumption

Themes use the `data-gh-theme` attribute on the root document element:

```html
<html data-gh-theme="dark"></html>
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

## Consuming a local build

Build the library and install its output into another Angular project:

```bash
npm run build:library
cd ../consumer-app
npm install ../gonzalo-brand-system/angular-design-system/dist/gh-design-system
```

Then add `@use 'gh-design-system/styles';` to the consumer's global SCSS and
import public TypeScript APIs from `gh-design-system`.

## Scope

This release is deliberately limited to foundations:

- Primitive and semantic CSS custom properties
- Light and dark themes
- Global base styles and reusable SCSS mixins
- A strongly typed Angular theme service
- A standalone documentation showcase

Button, Card, Hero and other product components are deferred to later work.
See [the architecture notes](docs/architecture.md) for contribution boundaries.
