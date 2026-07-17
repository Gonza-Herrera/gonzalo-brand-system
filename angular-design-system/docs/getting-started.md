# Getting started

## Requirements

- Node.js `^20.19.0`, `^22.12.0`, or `>=24.0.0`
- npm 10 or newer
- A current Angular application for local package consumption

## Install the workspace

```bash
cd angular-design-system
npm install
```

The workspace contains:

- `projects/gh-design-system` — reusable Angular library.
- `projects/showcase` — routed integration and landing application.
- `.storybook` — Storybook configuration.
- `stories/foundations` and `stories/compositions` — central visual references.
- Colocated `*.stories.ts` files — isolated component, layout, and pattern documentation.
- `docs` — maintainers' global documentation.

## Run the documentation surfaces

Storybook is the main isolated visual/API explorer:

```bash
npm run storybook
```

The script validates generated tokens, builds the library, and starts Storybook on port 6006.

Showcase is the integration application:

```bash
npm start
```

The script validates tokens, builds the library, and starts the Showcase on port 4200. If library source changes continuously while Showcase is open, run `npm run watch:library` in a second terminal.

## Consume a local library build

The package is not currently published to a public registry. Build it and install the generated package directory:

```bash
cd angular-design-system
npm run build:library

cd ../consumer-app
npm install ../gonzalo-brand-system/angular-design-system/dist/gh-design-system
```

All TypeScript imports use the public package root. Do not import files from `src/lib` or `dist` subpaths.

## Load public styles

Add the theme and token entrypoint to the consumer's global SCSS:

```scss
@use 'gh-design-system/styles';
```

The safe reset, base typography, selection, focus, and utility styles are deliberately opt-in:

```scss
@use 'gh-design-system/styles/foundations';
```

The library does not download remote font files. Consumers decide how Manrope and Inter are delivered; system fallbacks remain available.

## Import standalone components

```ts
import { Component } from '@angular/core';
import { GhButtonComponent, GhStackComponent } from 'gh-design-system';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [GhButtonComponent, GhStackComponent],
  template: `
    <gh-stack gap="md" align="start">
      <h2>Ready to continue?</h2>
      <gh-button variant="primary">Save changes</gh-button>
    </gh-stack>
  `,
})
export class ActionsComponent {}
```

Button renders a native `button` and defaults to `type="button"`. Set `type="submit"` intentionally inside a form. Icon-only usage requires `aria-label`.

## Compose layout and cards

```ts
import {
  GhCardComponent,
  GhContainerComponent,
  GhGridComponent,
  GhSectionComponent,
} from 'gh-design-system';
```

```html
<gh-section spacing="lg" surface="subtle">
  <gh-container size="xl">
    <gh-grid columns="auto" minItemSize="md" gap="lg">
      <gh-card variant="outlined" fullHeight>
        <div ghCardHeader><h2>Engineering</h2></div>
        <div ghCardContent><p>Clear systems for maintainable product work.</p></div>
      </gh-card>

      <gh-card variant="elevated" fullHeight>
        <div ghCardHeader><h2>Leadership</h2></div>
        <div ghCardContent><p>Helping teams grow through shared practices.</p></div>
      </gh-card>
    </gh-grid>
  </gh-container>
</gh-section>
```

Layout primitives use CSS-only responsive behavior and typed variants; consumers should compose them before introducing application-specific layout wrappers.

## Select a theme

Apply an explicit theme to the root document:

```ts
document.documentElement.dataset['theme'] = 'dark';
```

Angular consumers that need persisted `light`, `dark`, and `system` preference can inject the public service:

```ts
import { inject } from '@angular/core';
import { GhThemeService } from 'gh-design-system';

const theme = inject(GhThemeService);
theme.setTheme('system');
```

See [theming.md](theming.md) for the token contract and [accessibility.md](accessibility.md) for consumer responsibilities.

## Verify a change

```bash
npm run build
npm test -- --watch=false
npm run build-storybook
```

`npm run test-storybook` expects a running Storybook at the default port unless `TARGET_URL` is supplied according to the official Storybook test-runner interface.
