# Components

Reusable standalone Angular components live in dedicated feature directories.

## Available

- `badge/`: non-interactive status, category and count labels.
- `button/`: public native-button wrapper with variants, sizes, form behavior,
  loading state, icon projection, tests and accessibility documentation.
- `tag/`: static metadata, selectable filters and accessible removal behavior.

Each component owns its public API, template, encapsulated SCSS, colocated
tests and component-specific README. Internal showcase components remain in the
application and are never added here.
