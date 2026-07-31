# Theming

## Token layers

Repository JSON under `../tokens/` is the only editable token source. `scripts/tokens.mjs` validates references and generates the library's SCSS contracts.

Primitive tokens describe raw brand values and geometry:

```css
--gh-color-lavender
--gh-color-ink
--gh-space-md
--gh-radius-lg
--gh-shadow-primitive-md
```

Semantic tokens describe intent and change by theme:

```css
--gh-background-primary
--gh-surface-primary
--gh-text-primary
--gh-border-default
--gh-action-primary-background
--gh-status-success-background
--gh-focus-ring
--gh-shadow-md
--gh-surface-glass-background
--gh-surface-glass-backdrop-filter
--gh-surface-glass-fallback-background
```

Components consume semantic color, border, action, status, focus, and elevation tokens. This keeps visual meaning stable when the active theme changes. Primitive spacing, radius, typography, breakpoint, and motion tokens remain shared across themes.

## Public style entrypoints

Load tokens and light/dark mappings once in global SCSS:

```scss
@use 'gh-design-system/styles';
```

Opt into the reset and base styles only when the host application wants them:

```scss
@use 'gh-design-system/styles/foundations';
```

Both are package exports. Consumer components should not reach into internal Sass files.

## Theme activation

The style entrypoint applies light values to `:root` and follows `prefers-color-scheme: dark` when no explicit theme overrides the system. An explicit `data-theme` wins:

```html
<html data-theme="light"></html>
<html data-theme="dark"></html>
```

Priority is:

1. Explicit `data-theme` value.
2. Operating-system preference.
3. Light fallback.

`GhThemeService` provides the Angular-level preference behavior:

```ts
import { GhThemeService } from 'gh-design-system';

themeService.setTheme('light');
themeService.setTheme('dark');
themeService.setTheme('system');

themeService.preference();
themeService.resolvedTheme();
```

It persists the selected preference, removes the explicit attribute in system mode, reacts to `matchMedia` changes, and guards browser APIs for SSR.

## Storybook and Showcase

Storybook's toolbar offers deterministic light and dark globals. Its decorator writes the same `data-theme` contract to the preview document; it does not duplicate token values or depend on Showcase.

Showcase uses `GhThemeService` to demonstrate the complete light/dark/system consumer flow, including persistence and accessible selection controls.

## Using tokens in consumer styles

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

Use semantic tokens for any value that should adapt to theme. Use primitive spacing, radius, type, and motion tokens for stable geometry and rhythm.

Liquid Glass components additionally consume the complete semantic material contract rather than
raw `--gh-glass-*` ingredients. `system` remains the existing light/dark resolver and introduces no
third visual mapping. Every translucent material has a solid theme-aware fallback; see
[Liquid Glass design tokens](design/liquid-glass/tokens.md).

## Extending without breaking the contract

Application-specific tokens may alias public semantic tokens:

```css
:root {
  --app-dashboard-panel-background: var(--gh-surface-secondary);
  --app-dashboard-panel-border: var(--gh-border-subtle);
}
```

Do not overwrite `--gh-*` values globally to create a new visual system, redefine them inside individual components, or assume internal Sass maps are public. A new library theme must provide every semantic token, preserve readable text/action/status combinations, and be validated across all public stories before it becomes part of the supported contract.

For the complete current token inventory and generation workflow, see [tokens-and-themes.md](tokens-and-themes.md).
