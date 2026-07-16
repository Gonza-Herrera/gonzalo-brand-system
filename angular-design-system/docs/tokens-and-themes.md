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
- Primary action: `--gh-action-primary-background`, `text`, `hover`
- Focus: `--gh-focus-ring`
- Selection: `--gh-selection-background`, `text`
- Elevation: `--gh-shadow-sm`, `md`, `lg`

Future components must not redefine these variables locally without a
documented product-level reason.

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
Automated WCAG contrast regression testing remains recommended before these
derived values are used in public interactive components.
