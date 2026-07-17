# Portfolio

`portfolio` is the production application foundation for Gonzalo Herrera's public professional
website. It is intentionally separate from the technical Showcase and isolated Storybook docs:

- Portfolio owns public routing, real content, SSR, future SEO and deployment concerns.
- Showcase validates complex Design System integration for maintainers.
- Storybook documents foundations and public UI APIs in isolation.

This foundation does not implement the final page designs, navigation, footer, localization or
theme controls.

## Run, build and test

From `angular-design-system/`:

```bash
npm run start:portfolio
npm run build:portfolio
npm run test:portfolio
```

The focused scripts validate tokens and build `gh-design-system` before Portfolio when needed.
The application is served at `http://localhost:4200` by default.

The production build includes browser and server bundles with hydration:

```bash
npm run build:ssr:portfolio
npm run serve:ssr:portfolio
```

Build before running the SSR server. Its default address is `http://localhost:4000`; the official
Angular server reads `PORT` when the host provides one.

## Routes

All public pages are standalone and lazy-loaded below `PortfolioShellComponent`:

```text
/             Home
/about        About
/experience   Experience
/projects     Projects
/content      Content
/contact      Contact
/**           Not Found
```

The 404 page remains inside the shell so it receives the same skip link, landmarks and full-height
layout as known routes. Angular's route `title` metadata produces the base title `Gonzalo Herrera`
and page titles such as `About | Gonzalo Herrera`. The document head contains one minimal global
description; complete SEO belongs to PR 18.

## Architecture

```text
src/app/
├── core/                 Stable application configuration
├── content/              Typed, presentation-independent copy
│   ├── models/
│   ├── en/
│   └── es/
├── layout/
│   └── portfolio-shell/  Skip link and semantic page frame
├── pages/                Lazy standalone route components
├── shared/               Reserved for proven app-private reuse
└── styles/               Minimal application-level layout contract
```

`AppComponent` renders only the root `RouterOutlet`. The shell owns header, main and footer
landmarks while individual pages own their single `h1`. No page imports source files from the
library.

## Design System and themes

TypeScript consumers import only from the package root:

```ts
import { GhContainerComponent, GhSectionComponent, GhStackComponent } from 'gh-design-system';
```

Global SCSS loads the two stable package exports:

```scss
@use 'gh-design-system/styles';
@use 'gh-design-system/styles/foundations';
```

The application initializes the public, SSR-safe `GhThemeService`. Its initial `system` preference
resolves light or dark without duplicating browser APIs, storage logic, token values or theme
styles. A visible light/dark/system control is deferred to PR 11.

## Content strategy

`content/models` defines readonly identity and page contracts. English contains the minimal active
identity and placeholder copy. Spanish currently establishes identity copy only; PR 11 will add
locale selection, localized routes and complete parity. Content is compile-time TypeScript—there is
no CMS, HTTP-loaded JSON, Markdown engine or global state.

## SSR and environments

SSR uses the official Angular application builder, `@angular/ssr`, an Express server entry and
`provideClientHydration(withEventReplay())`. Every route currently uses server rendering, including
direct requests to lazy pages and the Not Found view. Application code has no direct access to
`window`, `document`, storage or media queries.

The existing workspace had no Angular environment-file convention, and no production domain is
approved, so this project does not introduce speculative `environment.ts` files or a `siteUrl`.
Runtime server port configuration uses the generated `PORT` environment variable.

## Accessibility and responsive foundation

- The skip link is the first focusable element and targets `main#main-content`.
- Header, main and footer landmarks have logical DOM order.
- Every route renders exactly one visible `h1`.
- Not Found uses a native link for navigation.
- Focus, contrast and themes use public Design System foundations.
- Container gutters and CSS-only flex layout support 320px through wide desktop sizes.
- The shell clips accidental horizontal overflow and keeps the footer at the bottom with short copy.

## Next step

PR 11 should replace the shell placeholders with the public navigation and footer patterns, add an
accessible light/dark/system control, introduce English/Spanish routing, and define focus behavior
for client-side navigation without implementing the final Home content.
