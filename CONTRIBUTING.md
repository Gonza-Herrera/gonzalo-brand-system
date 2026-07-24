# Contributing

Contributions should keep the brand source, generated tokens, Angular public API, Storybook, and Showcase aligned without broad unrelated changes.

## Branches and commits

Create a focused branch from the current integration branch:

- `feature/component-name`
- `fix/component-name-issue`
- `docs/storybook-guidelines`

Use concise conventional commit subjects:

- `feat: add button component`
- `fix: improve tag keyboard interaction`
- `docs: add theming guide`
- `test: add navigation interaction tests`

Keep each pull request reviewable and limited to one coherent outcome. Call out migrations, public API changes, or visual changes explicitly.

## Angular component structure

- Use standalone components, strict TypeScript, Signals-based inputs/outputs, and `OnPush` change detection.
- Export public APIs only through `projects/gh-design-system/src/public-api.ts`.
- Prefer composition over Angular class inheritance for visual families.
- Keep component styles and behavioral tests colocated with the component.
- Import library APIs from `gh-design-system` in consumers and stories whenever technically possible.
- Keep application-specific data, routing, and business logic outside the library.

## Tokens and themes

Repository JSON under `tokens/` is the editable source of truth. Never edit generated SCSS or showcase token data directly.

```bash
cd angular-design-system
npm run tokens:generate
npm run tokens:check
```

Component styles must use the existing `--gh-*` primitive or semantic contract. Do not hardcode theme colors or redefine public variables locally without a documented system-level reason. Verify light and dark themes whenever a semantic color, border, focus style, shadow, or surface changes.

## Accessibility requirements

- Prefer native elements and preserve their keyboard behavior.
- Use buttons for actions and links for navigation.
- Give icon-only controls an accessible name.
- Keep focus visible and meaningful in both themes.
- Use appropriate heading hierarchy, landmarks, lists, and ARIA only where native semantics are insufficient.
- Provide useful alternative text for informative images and empty alternative text for decorative images.
- Respect disabled, loading, reduced-motion, and responsive behavior.
- Do not disable accessibility rules globally to make a story pass.

The library aims to support accessible implementation, but changes must not claim formal WCAG conformance without an audit.

## Tests, stories, and documentation

Public behavior requires proportionate unit tests. Public visual states require colocated CSF stories with typed args, useful Controls, Autodocs, and simple representative data. Add a `play` function only when interaction adds coverage beyond the unit test, such as mobile-menu behavior or safe external-link attributes.

Story titles follow these groups:

- `Foundations/Colors`
- `Components/Button`
- `Components/Cards/Project Card`
- `Layout/Grid`
- `Patterns/Hero`
- `Compositions/Portfolio Home`

Use clear story names such as `Playground`, `Disabled`, `With Icons`, `Long Content`, and `Mobile`. Colocated files use `<component>.stories.ts`; central foundation and composition stories use `<topic>.stories.ts`.

Update the relevant component README or global guide whenever behavior, theming, accessibility responsibility, installation, or architecture changes.

## Before opening a pull request

Run from `angular-design-system/`:

```bash
npm run tokens:check
npm run build
npm test -- --watch=false
npm run build-storybook
```

For interaction tests, run Storybook in one terminal and the runner in another:

```bash
npm run storybook
npm run test-storybook
```

Checklist:

- [ ] Scope is focused and the public API is intentional.
- [ ] Generated token output is synchronized.
- [ ] New or changed behavior has unit tests.
- [ ] New or changed visual states have stories and useful Controls.
- [ ] Keyboard, focus, semantics, contrast, and responsive behavior were reviewed.
- [ ] Light and dark themes were reviewed.
- [ ] Library, Showcase, unit tests, and Storybook build successfully.
- [ ] Documentation reflects the final behavior.
