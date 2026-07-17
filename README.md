# Gonzalo Herrera Brand System

**Think bigger. Build smarter.**

This repository is the source of truth for Gonzalo Herrera's personal brand and its reusable Angular Design System. It connects brand strategy, visual direction, design tokens, technical documentation, and production-ready Angular building blocks.

The system is evolving. The Angular library is not currently published to a public package registry; consumers build and install it locally from this repository.

## Repository contents

```text
brand/                  Brand identity, voice, positioning, and principles
design/                 Visual direction and design references
tokens/                 Editable primitive and semantic token JSON
themes/                 Theme-level source material and guidance
styles/                 Repository-level style guidance
ai/                     AI collaboration context and project conventions
linkedin/               LinkedIn content and profile guidance
website/                Website content and product direction
assets/                 Shared brand assets
angular-design-system/  Angular library, Portfolio, Showcase, Storybook, tests, and docs
```

## Angular Design System

`angular-design-system/` contains three Angular projects and complementary development surfaces:

- `gh-design-system` — the reusable standalone-component library and public SCSS entrypoints.
- `portfolio` — the SSR-enabled public production application and home of real website content.
- `showcase` — a routed integration application demonstrating full pages, navigation, and realistic composition.
- Storybook — the primary isolated visual/API reference for foundations, variants, states, Controls, accessibility checks, interaction tests, and responsive inspection.
- Component READMEs — focused API and implementation notes colocated with source.

The public library currently includes:

- Components: Button, Badge, Tag, Card, Article Card, Experience Card, and Project Card.
- Layout: Container, Section, Stack, Inline, Grid, Cluster, and Divider.
- Patterns: Hero, Navigation, Footer, Section Heading, Feature Grid, Experience Timeline, Content Highlight, and Contact Callout.
- Foundations: generated design tokens, opt-in base styles, light/dark themes, and an SSR-safe theme service with system preference support.

## Requirements and installation

- Node.js `^20.19.0`, `^22.12.0`, or `>=24.0.0`
- npm 10 or newer

```bash
cd angular-design-system
npm install
```

## Development

Run Storybook for isolated component work:

```bash
npm run storybook
```

Run the integration Showcase:

```bash
npm start
```

`npm start` checks generated tokens, builds the library, and serves the Showcase. The equivalent focused command is `ng serve showcase` after building the library.

Run the public Portfolio foundation:

```bash
npm run start:portfolio
```

## Build and tests

```bash
npm run build
npm test -- --watch=false
npm run build-storybook
```

Focused commands:

```bash
ng build gh-design-system
ng build showcase
ng build portfolio
ng test gh-design-system --watch=false
ng test showcase --watch=false
npm run test:portfolio
```

The focused Portfolio commands are `npm run build:portfolio`, `npm run test:portfolio`, and
`npm run build:ssr:portfolio`. Its browser and server bundles are generated together.

Storybook interaction and accessibility tests run against a live Storybook instance:

```bash
# terminal 1
npm run storybook

# terminal 2
npm run test-storybook
```

## Local library consumption

Build the package, then install the generated directory from another Angular application:

```bash
cd angular-design-system
npm run build:library

cd ../consumer-app
npm install ../gonzalo-brand-system/angular-design-system/dist/gh-design-system
```

Import standalone components only through the package root:

```ts
import { GhButtonComponent, GhStackComponent } from "gh-design-system";
```

Load the public styles from global SCSS:

```scss
@use "gh-design-system/styles";
@use "gh-design-system/styles/foundations"; // optional reset and base styles
```

## Themes

Light and dark themes share the same semantic `--gh-*` contract. Apply an explicit theme to the document root:

```html
<html data-theme="dark"></html>
```

Angular consumers can use `GhThemeService` for `light`, `dark`, or `system` preference. Storybook exposes light/dark in its toolbar; Showcase demonstrates the complete persisted light/dark/system flow.

## Documentation responsibilities

- This README explains repository scope and the fastest paths to development.
- Storybook is the canonical visual and component API explorer.
- Showcase validates end-to-end integration, routing, and full compositions.
- Portfolio owns the public website, typed content, SSR, routing and future product concerns.
- [`angular-design-system/docs/`](angular-design-system/docs/) contains installation, architecture, theming, accessibility, contribution, and release guidance.
- Colocated component READMEs document focused behavior and implementation boundaries.

Start with the [Getting Started guide](angular-design-system/docs/getting-started.md), then review [architecture](angular-design-system/docs/architecture.md), [theming](angular-design-system/docs/theming.md), and [accessibility](angular-design-system/docs/accessibility.md).

## Contribution

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Changes to public UI must use existing design tokens, include proportionate tests and stories, and be reviewed in light, dark, and relevant responsive sizes.
