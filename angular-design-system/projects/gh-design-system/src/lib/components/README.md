# Components

Reusable standalone Angular components live in dedicated feature directories.

## Available

- `ambient-background/`: controlled, decorative environmental context for solid and glass surfaces.
- `badge/`: non-interactive status, category and count labels.
- `button/`: public native-button wrapper with variants, sizes, form behavior,
  loading state, icon projection, tests and accessibility documentation.
- `cards/`: foundational Card plus typed Article, Experience and Project
  compositions.
- `glass-panel/`: a constrained glass-only convenience composition over Surface.
- `surface/`: neutral, token-driven solid and Liquid Glass material primitive.
- `tag/`: static metadata, selectable filters and accessible removal behavior.

Each component owns its public API, template, encapsulated SCSS, colocated
tests and component-specific README. Internal showcase components remain in the
application and are never added here.
