# Styles

## Public theme and token entry point

```scss
@use 'gh-design-system/styles';
```

This import exposes primitive variables and theme-aware semantic variables. It
does not apply a global reset. It also emits the public native Form Control class
foundation documented in
[`form-controls.md`](../../../../../docs/design/liquid-glass/form-controls.md).

Components should prefer semantic properties:

```scss
.example {
  background: var(--gh-surface-primary);
  color: var(--gh-text-primary);
  border-color: var(--gh-border-default);
  box-shadow: var(--gh-shadow-sm);
}
```

Native forms can opt into the shared visual contract without an Angular wrapper:

```html
<label class="gh-form-field">
  <span class="gh-form-field__label">Email</span>
  <input class="gh-input" type="email" />
</label>
```

Checkbox, radio, switch, affix, state, Angular Forms, and accessibility guidance lives in the Form
Control contract. Consumer styles must not reproduce the material recipe.

Generated themes also expose the `navigation.*` component contract used by the public Navigation
pattern and real application shells. Navigation styles consume those aliases rather than primitive
Glass variables; Header and mobile panel filters always follow opaque fallbacks.

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
