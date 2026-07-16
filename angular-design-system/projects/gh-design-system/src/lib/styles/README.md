# Styles

## Public theme and token entry point

```scss
@use 'gh-design-system/styles';
```

This import exposes primitive variables and theme-aware semantic variables. It
does not apply a global reset.

Components should prefer semantic properties:

```scss
.example {
  background: var(--gh-surface-primary);
  color: var(--gh-text-primary);
  border-color: var(--gh-border-default);
  box-shadow: var(--gh-shadow-sm);
}
```

Primitive color variables are reserved for documentation and approved brand
expressions. Spacing and radius primitives remain appropriate for component
geometry.

## Opt-in foundations

```scss
@use 'gh-design-system/styles/foundations';
```

This additional entry point applies the safe reset, global base typography,
semantic body colors, accessible focus styles and reduced-motion behavior.

## Mixins

```scss
@use 'gh-design-system/styles/mixins' as gh;
```

Available mixins:

- `gh.surface`
- `gh.section`
- `gh.container`
- `gh.focus-ring`

Files under `tokens/` and `themes/` are generated from the repository-level
JSON sources by `scripts/tokens.mjs`.
