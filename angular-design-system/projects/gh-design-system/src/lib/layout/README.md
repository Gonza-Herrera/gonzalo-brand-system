# Layout primitives

Public standalone composition components live in this directory:

- `gh-container`: constrained widths and responsive gutters.
- `gh-section`: semantic vertical regions and surfaces.
- `gh-stack`: token-spaced vertical flow.
- `gh-inline`: small horizontal groups with optional wrapping.
- `gh-grid`: auto-fit and progressively responsive fixed grids.
- `gh-cluster`: permanently wrapping compact groups.
- `gh-divider`: decorative or semantic separators.

All primitives use closed typed variants, project arbitrary content, avoid
viewport JavaScript and remain compatible with SSR and hydration. Component
directories contain their API types, tests and detailed usage guidance.

Import exclusively from the package root:

```ts
import {
  GhClusterComponent,
  GhContainerComponent,
  GhDividerComponent,
  GhGridComponent,
  GhInlineComponent,
  GhSectionComponent,
  GhStackComponent,
} from 'gh-design-system';
```
