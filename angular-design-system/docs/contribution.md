# Storybook and design-system contribution

The repository-level [CONTRIBUTING.md](../../CONTRIBUTING.md) is the canonical contribution guide. This page summarizes Storybook-specific expectations close to the Angular workspace.

## Story placement

- Component, Layout, and Pattern stories are colocated with the public component.
- Foundations live under `stories/foundations`.
- Integrated examples live under `stories/compositions`.
- Global prose lives under `docs`.

Use public imports from `gh-design-system`, typed `Meta`/`StoryObj`, `tags: ['autodocs']`, closed Controls for union inputs, simple deterministic example data, and existing public assets.

## Naming

```text
Foundations/Colors
Components/Button
Components/Cards/Project Card
Layout/Grid
Patterns/Hero
Compositions/Portfolio Home
```

Story names should communicate a real state: `Playground`, `Disabled`, `With Icons`, `Long Content`, `Mobile`. Avoid temporary names such as `Test`, `Example New`, or `Final`.

## Scope

Storybook owns isolated visual/API documentation, variants, states, Controls, accessibility checks, responsive inspection, and targeted interactions. Showcase owns routed integration, full pages, and complete brand-pattern flows. Add the smallest example that proves the intended behavior; do not copy an entire Showcase page into Storybook.

## Required review

Before opening a pull request, verify the relevant story at 320, 375, 768, 1024, and 1440 pixels as applicable; review light and dark; inspect Controls, Autodocs, source snippets, assets, console output, keyboard behavior, and the accessibility panel.

```bash
npm run build
npm test -- --watch=false
npm run build-storybook
```
