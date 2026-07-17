# Gonzalo Herrera Angular Design System

Official Angular workspace for the Gonzalo Herrera Design System.

This workspace provides a reusable Angular library with Button, Badge, Tag, a
four-component Card family, seven Layout Primitives and eight Brand Patterns,
plus Storybook, a routed standalone Showcase, an SSR-enabled Portfolio
foundation, token-driven SCSS, light/dark/system theming, unit tests,
accessibility checks and targeted interaction tests.

## Requirements

- Node.js `^20.19.0`, `^22.12.0` or `>=24.0.0`
- npm 10 or newer

The workspace currently uses Angular 21 because it is the newest release line
compatible with the repository's Node.js 22.18 runtime.

## Workspace structure

```text
angular-design-system/
├── .storybook/
│   ├── main.ts
│   ├── preview.ts
│   └── manager.ts
├── docs/
│   ├── getting-started.md
│   ├── theming.md
│   ├── accessibility.md
│   └── architecture.md
├── projects/
│   ├── gh-design-system/
│   │   └── src/
│   │       ├── lib/
│   │       │   ├── components/
│   │       │   │   ├── badge/
│   │       │   │   ├── button/
│   │       │   │   ├── cards/
│   │       │   │   └── tag/
│   │       │   ├── layout/
│   │       │   │   ├── cluster/
│   │       │   │   ├── container/
│   │       │   │   ├── divider/
│   │       │   │   ├── grid/
│   │       │   │   ├── inline/
│   │       │   │   ├── section/
│   │       │   │   └── stack/
│   │       │   ├── patterns/
│   │       │   │   ├── hero/
│   │       │   │   ├── navigation/
│   │       │   │   ├── footer/
│   │       │   │   ├── section-heading/
│   │       │   │   ├── feature-grid/
│   │       │   │   ├── experience-timeline/
│   │       │   │   ├── content-highlight/
│   │       │   │   └── contact-callout/
│   │       │   ├── styles/
│   │       │   └── theming/
│   │       └── public-api.ts
│   ├── showcase/
│   │   └── src/app/
│   │       ├── core/
│   │       ├── layout/
│   │       ├── pages/
│   │       └── shared/
│   └── portfolio/
│       └── src/app/
│           ├── content/
│           ├── core/
│           ├── layout/
│           ├── pages/
│           ├── shared/
│           └── styles/
├── stories/
│   ├── foundations/
│   ├── compositions/
│   └── shared/
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

Run the public Portfolio foundation separately:

```bash
npm run start:portfolio
```

Portfolio uses lazy standalone pages, the public Design System package, SSR and
client hydration. See [`projects/portfolio/README.md`](projects/portfolio/README.md)
for its architecture and current scope.

Run Storybook for isolated visual and API documentation:

```bash
npm run storybook
```

Open `http://localhost:6006`. This script also validates tokens and builds the
library before starting Storybook.

## Build and test

```bash
npm run build
npm test -- --watch=false
npm run build-storybook
```

Useful focused commands:

```bash
npm run build:library
npm run build:showcase
npm run build:portfolio
npm run build:ssr:portfolio
npm run test:portfolio
npm run watch:library
npm run watch:showcase
ng build gh-design-system
ng build showcase
```

Run Storybook interactions and accessibility checks against a running server:

```bash
npm run test-storybook
```

The production library output is written to `dist/gh-design-system`. The
showcase output is written to `dist/showcase`.

## Token and style consumption

The repository-level [`/tokens`](../tokens) directory remains the source of
truth. The library's SCSS maps those primitive and theme definitions to
namespaced CSS custom properties.

Storybook, Showcase and installed consumers use the same package export:

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

## Card family

```ts
import {
  GhArticleCardComponent,
  GhCardComponent,
  GhExperienceCardComponent,
  GhProjectCardComponent,
} from 'gh-design-system';
```

```html
<gh-card variant="elevated">
  <div ghCardHeader><h2>Engineering Leadership</h2></div>
  <div ghCardContent><p>Helping teams build better software.</p></div>
</gh-card>

<gh-article-card [article]="article" />
<gh-experience-card [experience]="experience" />
<gh-project-card [project]="project" orientation="horizontal" />
```

The foundational Card controls surface, padding, radius and visual states.
Article, Experience and Project Cards use typed models, semantic HTML, native
links and existing public Badge/Tag components.

## Layout primitives

```ts
import {
  GhClusterComponent,
  GhContainerComponent,
  GhDividerComponent,
  GhGridComponent,
  GhInlineComponent,
  GhSectionComponent,
  GhStackComponent,
} from 'gh-design-system';
```

```html
<gh-section spacing="lg" surface="subtle">
  <gh-container size="xl">
    <gh-stack gap="lg">
      <h2>Projects</h2>
      <gh-grid columns="auto" minItemSize="md">
        @for (project of projects; track project.title) {
        <gh-project-card [project]="project" />
        }
      </gh-grid>
    </gh-stack>
  </gh-container>
</gh-section>
```

Layout APIs accept only typed variants. Responsive behavior uses CSS, fluid
tokens and generated shared Sass breakpoints; no primitive reads the viewport
or accesses browser globals.

## Brand Patterns

```ts
import {
  GhContactCalloutComponent,
  GhContentHighlightComponent,
  GhExperienceTimelineComponent,
  GhFeatureGridComponent,
  GhFooterComponent,
  GhHeroComponent,
  GhNavigationComponent,
  GhSectionHeadingComponent,
} from 'gh-design-system';
```

Hero, Navigation, Footer, Section Heading, Feature Grid, Experience Timeline,
Content Highlight and Contact Callout compose the existing public components
and Layout Primitives into configurable page structures. Navigation remains
native-link based, mobile state uses Signals, responsive behavior is CSS-only
and all pattern content remains consumer-owned.

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
| `/layout`     | Public Layout Primitives      |
| `/buttons`    | Public Button component       |
| `/badges`     | Public Badge component        |
| `/tags`       | Public Tag component          |
| `/cards`      | Public Card family            |
| `/patterns`   | Public Brand Patterns         |

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

This release is deliberately limited to foundations, Button, Badge, Tag,
Cards, Layout Primitives and Brand Patterns:

- Primitive and semantic CSS custom properties
- Light and dark themes
- Opt-in global foundations and reusable SCSS mixins
- Deterministic JSON validation and SCSS generation
- A strongly typed, SSR-safe Angular theme service
- A routed, responsive and accessible foundations showcase
- A standalone, accessible and token-driven public Button component
- Non-interactive Badge status and category labels
- Static, selectable and removable Tag behavior
- Foundational, Article, Experience and Project Cards
- Container, Section, Stack, Inline, Grid, Cluster and Divider composition
- Hero, Navigation, Footer, Section Heading, Feature Grid, Experience Timeline,
  Content Highlight and Contact Callout

See [Getting Started](docs/getting-started.md), [the architecture
notes](docs/architecture.md), [theming](docs/theming.md),
[accessibility](docs/accessibility.md), [the token reference](docs/tokens-and-themes.md) and
[component documentation](projects/gh-design-system/src/lib/components/README.md)
for contribution boundaries.
