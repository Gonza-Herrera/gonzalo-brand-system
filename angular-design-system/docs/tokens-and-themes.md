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
- Status roles: `--gh-status-{variant}-background`, `text`, `border`,
  `solid-background`, `solid-text` for neutral, info, success, warning, danger
  and accent
- Tag interaction roles: `--gh-tag-{variant}-hover`, `active`,
  `selected-background`, `selected-text`, `selected-border`, `remove-hover`
  for neutral, accent and info
- Focus: `--gh-focus-ring`
- Selection: `--gh-selection-background`, `text`
- Elevation: `--gh-shadow-sm`, `md`, `lg`

Future components must not redefine these variables locally without a
documented product-level reason.

Primitive motion variables provide a minimal shared interaction rhythm:

- `--gh-motion-duration-fast`
- `--gh-motion-duration-slow`
- `--gh-motion-easing-standard`

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
