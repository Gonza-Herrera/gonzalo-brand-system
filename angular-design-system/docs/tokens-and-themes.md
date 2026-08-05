# Tokens and themes

## Consumption

```scss
@use 'gh-design-system/styles';
```

Optional safe global foundations:

```scss
@use 'gh-design-system/styles/foundations';
```

Example:

```scss
.example {
  color: var(--gh-text-primary);
  background: var(--gh-surface-primary);
  padding: var(--gh-space-md);
  border: var(--gh-border-width-default) solid var(--gh-border-default);
  border-radius: var(--gh-radius-md);
  box-shadow: var(--gh-shadow-sm);
}
```

## Semantic contract

- Background: `--gh-background-primary`, `secondary`, `subtle`
- Surface: `--gh-surface-primary`, `secondary`, `elevated`
- Liquid Glass materials: `--gh-surface-solid-*`,
  `--gh-surface-glass-subtle-*`, `--gh-surface-glass-*`,
  `--gh-surface-glass-elevated-*` and `--gh-surface-glass-floating-*`
- Liquid Glass support roles: `--gh-surface-overlay-*`,
  `--gh-surface-interactive-*`, `--gh-surface-disabled-*`,
  `--gh-surface-transition-*` and `--gh-surface-radius-*`
- Text: `--gh-text-primary`, `secondary`, `muted`, `inverse`, `accent`
- Border: `--gh-border-default`, `subtle`, `strong`
- Primary action: `--gh-action-primary-background`, `text`, `hover`, `active`,
  `border`
- Secondary action: `--gh-action-secondary-background`, `text`, `hover`,
  `active`, `border`
- Ghost action: `--gh-action-ghost-text`, `hover`, `active`
- Danger action: `--gh-action-danger-background`, `text`, `hover`, `active`,
  `border`
- Disabled action: `--gh-action-disabled-background`, `text`, `border`
- Button component roles: `--gh-button-{variant}-*` for Primary, Secondary, Tertiary, Ghost and
  Danger materials and states, plus `--gh-button-*` structure, focus, motion, spinner and disabled
  aliases
- Icon Button component roles: `--gh-icon-button-{variant}-*` for Primary, Secondary, Ghost and
  Danger, plus compact size, focus, motion, spinner and disabled aliases
- Status roles: `--gh-status-{variant}-background`, `text`, `border`,
  `solid-background`, `solid-text` for neutral, info, success, warning, danger
  and accent
- Tag interaction roles: `--gh-tag-{variant}-hover`, `active`,
  `selected-background`, `selected-text`, `selected-border`, `remove-hover`
  for neutral, accent and info
- Card roles: `--gh-card-background`, `background-subtle`, `background-glass`,
  `border`, `border-glass`, `border-hover`, `border-selected`,
  `background-selected`, `shadow`, `shadow-hover`, `glass-blur`
- Brand Pattern roles: `--gh-pattern-accent-gradient`,
  `navigation-background`, `navigation-border`, `footer-background` and
  `timeline-connector`
- Focus: `--gh-focus-ring`
- Selection: `--gh-selection-background`, `text`
- Elevation: `--gh-shadow-sm`, `md`, `lg`

Future components must not redefine these variables locally without a
documented product-level reason.

Each Liquid Glass material exposes a consistent theme-aware contract for its
background, solid fallback, border, highlight, composed backdrop filter, outer
and inner shadow, foregrounds and radius. Components consume those semantic
properties rather than assembling `--gh-glass-*` primitives. See the normative
[Liquid Glass token documentation](design/liquid-glass/tokens.md) for the
material map, feature-detection recipe and PR 23 consumption boundary.

Primitive motion variables provide a minimal shared interaction rhythm:

- `--gh-motion-duration-fast`
- `--gh-motion-duration-slow`
- `--gh-motion-easing-standard`

Layout primitives use the following generated geometry contract:

- `--gh-space-none` and the existing spacing scale for component gaps.
- `--gh-container-{sm|md|lg|xl|wide}` for maximum widths.
- `--gh-container-gutter-{sm|md|lg}` for fluid horizontal gutters.
- `--gh-section-padding-{sm|md|lg}` for fluid vertical rhythm.
- `--gh-grid-min-{sm|md|lg}` for auto-fit item constraints.
- `--gh-breakpoint-{sm|md|lg}` as documented CSS values.

Because CSS custom properties cannot be evaluated in media-query conditions,
the same breakpoint source generates `styles/tokens/_breakpoints.scss`. Grid
uses those Sass variables internally; breakpoint values are never duplicated
inside components.

## Theme application

```html
<html data-theme="light"></html>
```

```html
<html data-theme="dark"></html>
```

Priority:

1. Explicit `data-theme`
2. `prefers-color-scheme`
3. Light default

The existing `GhThemeService` applies the same attribute and persists explicit
preferences. It also supports `system`, removes the explicit attribute in that
mode and reacts to operating-system changes through `matchMedia`.

```ts
themeService.setTheme('light');
themeService.setTheme('dark');
themeService.setTheme('system');
```

`preference` exposes the selected option and `resolvedTheme` exposes the
effective light or dark result. On the server the initial result is
predictably light and no browser API is accessed.

## Typography

`--gh-font-family-display` uses Manrope and
`--gh-font-family-body` uses Inter, both with `system-ui` fallbacks. The library
does not fetch or bundle remote fonts. Consumers decide how official font files
are loaded.

## Source synchronization

Edit JSON only under the repository-level `tokens/` directory, then run:

```bash
npm run tokens:generate
npm run tokens:check
```

The generator uses TypeScript already present in the workspace and adds no
token-framework dependency. It also generates the typed token catalogue used
by showcase pages.

## Contrast note

Primary and secondary text values are based on the established high-contrast
neutral values. Accent text, focus and subtle surfaces use `color-mix()` to
derive accessible brand-aware values without inventing a separate palette.
Button text/background pairs were selected for strong contrast in both themes;
status and Tag pairs follow the same high-contrast approach. Automated WCAG
contrast regression testing remains recommended as the component catalogue
grows.
