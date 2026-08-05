# Design Tokens

This directory is the source of truth for the Gonzalo Herrera Design System.

## Structure

```text
tokens/
├── primitives/
│   ├── ambient.json
│   ├── borders.json
│   ├── colors.json
│   ├── glass.json
│   ├── layout.json
│   ├── motion.json
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

The showcase token catalogue at
`angular-design-system/projects/showcase/src/app/shared/data/foundation-tokens.generated.ts`
is generated from the same source, so displayed names, variables and technical
values cannot drift from the library.

## Validation and generation

From `angular-design-system/`:

```bash
npm run tokens:validate
npm run tokens:generate
npm run tokens:check
```

Validation rejects invalid JSON, duplicate object keys, duplicate token paths,
missing references, circular references, unpredictable names, CSS-variable name
collisions, unsafe Liquid Glass ranges and incomplete or type-incompatible
dark-theme coverage.

The build and test scripts run `tokens:check` so stale generated SCSS or
showcase data cannot be merged accidentally.

`motion.json` currently defines the minimal timing contract required by public
interactive components: fast state transitions, a slow loading cycle and the
standard easing curve.

`layout.json` defines public Container widths, responsive gutters, Section
padding, Grid minimum item sizes and the shared responsive breakpoints. The
generator publishes both CSS custom properties and a Sass breakpoint partial,
because custom properties cannot be evaluated inside media-query conditions.

The semantic contract includes action roles, Button, Icon Button and Card component aliases, six
status families for Badge and three interactive Tag families. Theme generation must provide
complete coverage for every semantic path.

Button and Card component aliases live once in `semantic-tokens.json` because they contain no
theme-specific raw values: each alias resolves through the current theme's action, Surface, focus,
motion and structural roles. The generator includes those identical component contracts in both
generated theme maps while `themes/dark.json` remains responsible for the underlying dark semantic
values. This avoids copying full component graphs while preserving generated light/dark key and
type parity.

`glass.json` defines the deliberately limited blur, saturation, opacity,
highlight and inner-shadow material ingredients. Theme-aware `surface.*` roles
in `semantic-tokens.json` and `themes/dark.json` compose those ingredients into
Solid, Glass Subtle, Glass, Glass Elevated and Glass Floating materials, plus
overlay, interaction, disabled and fallback roles. `system` resolves through
the existing light/dark mechanism and does not have a third token file.

Components must consume the generated `--gh-surface-*` variables. Primitive
`--gh-glass-*` variables exist to compose the semantic theme contract and must
not become ad hoc component utilities.

`ambient.json` defines only the bounded environmental opacity scale. Theme-aware
`ambient.background.*`, `ambient.preset.*` and `ambient.intensity.*` roles compose the approved
static Subtle, Brand, Cool and Warm fields, plus the `none` path. Components consume semantic
`--gh-ambient-*` variables; they do not assemble local gradients or consume primitive opacity
directly.

Legacy Card roles remain for compatibility with existing pattern consumers. The PR 26 `card.*`
component contract adds structural, material, interactive and selected aliases for the complete
Card family. Its `outlined`, `subtle`, `glass` and `elevated` groups map to semantic Solid, Glass
Subtle, Glass and Glass Elevated contracts; component SCSS does not consume primitives directly.

Brand Pattern roles centralize the single restrained accent gradient plus
navigation, footer and timeline colors. Hero, Content Highlight and Contact
Callout share the gradient rather than defining independent decorative values.
