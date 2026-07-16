# Gonzalo Herrera Angular Design System

Official Angular workspace for the Gonzalo Herrera Design System.

This release provides a reusable Angular library with Button, Badge and Tag, a
routed standalone showcase, token-driven SCSS, light/dark/system theming and
unit-test configuration.

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
│   │       │   │   ├── badge/
│   │       │   │   ├── button/
│   │       │   │   └── tag/
│   │       │   ├── patterns/
│   │       │   ├── styles/
│   │       │   └── theming/
│   │       └── public-api.ts
│   └── showcase/
│       └── src/app/
│           ├── core/
│           ├── layout/
│           ├── pages/
│           └── shared/
└── README.md
```

## Install and run

```bash
cd angular-design-system
npm install
npm start
```

Open `http://localhost:4200`.

Equivalent Angular CLI command:

```bash
ng serve showcase
```

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
ng build gh-design-system
ng build showcase
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

The SCSS under `styles/tokens/`, `styles/themes/` and the typed showcase token
catalogue are generated from repository-level JSON:

```bash
npm run tokens:validate
npm run tokens:generate
npm run tokens:check
```

Generated files must never be edited manually.

The token contract includes semantic action roles for primary, secondary,
ghost, danger and disabled states, plus minimal motion duration and easing
variables for interactive components.

## Button component

Import the standalone component from the package root:

```ts
import { GhButtonComponent } from 'gh-design-system';

@Component({
  standalone: true,
  imports: [GhButtonComponent],
})
export class ExampleComponent {}
```

```html
<gh-button>Save changes</gh-button>

<gh-button variant="secondary" size="lg"> View project </gh-button>

<gh-button type="submit" [loading]="isSaving()"> Save </gh-button>
```

Supported public types are `GhButtonVariant`, `GhButtonSize` and
`GhButtonType`. The native button defaults to `type="button"` and supports
disabled, loading, full-width and start/end icon content. Icon-only buttons
must provide `aria-label`.

## Badge and Tag components

```ts
import { GhBadgeComponent, GhTagComponent } from 'gh-design-system';
```

```html
<gh-badge variant="success">Ready</gh-badge>

<gh-tag>Angular</gh-tag>

<gh-tag mode="selectable" [selected]="selected()" (selectedChange)="selected.set($event)">
  Leadership
</gh-tag>

<gh-tag mode="removable" ariaLabel="Remove AI filter" (removed)="removeFilter()"> AI </gh-tag>
```

Badge supports six semantic variants, soft/solid appearance and small/medium
sizes while remaining non-interactive. Tag supports mutually exclusive static,
selectable and removable modes, three variants and two sizes.

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
themeService.setTheme('system');

themeService.preference();
themeService.resolvedTheme();
```

The service persists `light`, `dark` or `system` in local storage. In system
mode it removes the explicit attribute and reacts to
`prefers-color-scheme`. Browser access is guarded for SSR.

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

## Showcase routes

| Route         | Documentation                 |
| ------------- | ----------------------------- |
| `/`           | Overview and system status    |
| `/colors`     | Primitive and semantic colors |
| `/typography` | Families and type scale       |
| `/spacing`    | Spacing scale                 |
| `/radii`      | Border radii                  |
| `/shadows`    | Theme-aware elevation         |
| `/buttons`    | Public Button component       |
| `/badges`     | Public Badge component        |
| `/tags`       | Public Tag component          |

The shell provides a desktop sidebar, accessible mobile menu, active route
state and the Light/Dark/System selector.

## Adding a showcase page

1. Create a standalone component under `projects/showcase/src/app/pages/`.
2. Add a lazy route in `app.routes.ts`.
3. Add one navigation entry to `SHOWCASE_NAVIGATION`.
4. Consume public design-system variables and shared documentation components.
5. Add behavioral tests for routing or interaction where they provide value.

Components under `showcase/src/app/shared` and `layout` are documentation-only.
They must not be exported from the library public API.

## Scope

This release is deliberately limited to foundations, Button, Badge and Tag:

- Primitive and semantic CSS custom properties
- Light and dark themes
- Opt-in global foundations and reusable SCSS mixins
- Deterministic JSON validation and SCSS generation
- A strongly typed, SSR-safe Angular theme service
- A routed, responsive and accessible foundations showcase
- A standalone, accessible and token-driven public Button component
- Non-interactive Badge status and category labels
- Static, selectable and removable Tag behavior

Card, Hero and other product components are deferred to later work.
See [the architecture notes](docs/architecture.md), [tokens and themes
guide](docs/tokens-and-themes.md) and
[component documentation](projects/gh-design-system/src/lib/components/README.md)
for contribution boundaries.
