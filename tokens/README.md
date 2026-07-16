# Design Tokens

This directory is the source of truth for the Gonzalo Herrera Design System.

## Structure

```text
tokens/
├── primitives/
│   ├── borders.json
│   ├── colors.json
│   ├── layout.json
│   ├── radii.json
│   ├── shadows.json
│   ├── spacing.json
│   └── typography.json
├── semantic-tokens.json
└── themes/
    ├── dark.json
    └── light.json
```

Every token leaf uses `$type` and `$value`. References use the
`{category.token}` syntax.

The Angular library SCSS files under
`angular-design-system/projects/gh-design-system/src/lib/styles/tokens/` and
`styles/themes/` are generated artifacts. Do not edit them manually.

## Validation and generation

From `angular-design-system/`:

```bash
npm run tokens:validate
npm run tokens:generate
npm run tokens:check
```

Validation rejects invalid JSON, duplicate object keys, duplicate token paths,
missing references, circular references, unpredictable names and incomplete
dark-theme coverage.

The build and test scripts run `tokens:check` so stale generated SCSS cannot be
merged accidentally.
