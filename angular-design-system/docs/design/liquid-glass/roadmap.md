# Liquid Glass adoption roadmap

The migration is incremental. Documentation establishes the contract; tokens and primitives prove
it; components adopt it only after accessibility and performance gates pass. No PR should combine a
foundation change with a broad product migration.

## Current component status

| Area                                   | Current status                                                  | Intended future review                   |
| -------------------------------------- | --------------------------------------------------------------- | ---------------------------------------- |
| Global foundations and themes          | PR 22 token contract available; product unchanged               | Component adoption                       |
| Surface primitive                      | PR 23 Surface and Glass Panel implemented                       | Component reuse in PR 25 and PR 26       |
| Ambient backgrounds                    | PR 24 primitive and controlled presets implemented              | Product migration after library adoption |
| Button and Icon Button                 | PR 25 component migration implemented                           | Validate through component consumers     |
| Foundational Card                      | PR 26 component migration implemented                           | Validate through component consumers     |
| Article, Experience, and Project Cards | PR 26 mappings inherited through foundational Card              | Product-specific evidence only           |
| Forms and form controls                | PR 27 native control foundations implemented                    | Validate through component consumers     |
| Navigation                             | PR 28 architecture through PR 28.3 polish and QA implemented    | Validate through component consumers     |
| Footer                                 | Pending; existing pattern tokens unchanged                      | Dedicated pattern migration              |
| Hero and Content Highlight             | Pending; existing glass/gradient surfaces unchanged             | Pattern migration PR                     |
| Badge and Tag                          | Pending                                                         | Compact component review                 |
| Alerts, toasts, and status feedback    | Pending; not currently public                                   | Feedback component PR                    |
| Dialogs and overlays                   | Pending; not currently public                                   | Overlay primitives PR                    |
| Popovers and tooltips                  | Pending; not currently public                                   | Floating surface PR                      |
| Storybook documentation                | Tokens, Surface, Ambient, Buttons, Cards, Forms and Navigation  | Add component migrations incrementally   |
| Showcase                               | Surface, Ambient, Button, Card, Form and Navigation integration | Integrate later approved primitives      |
| Portfolio                              | Button, Card, Form and Navigation migrations inherited          | Product redesign remains out of scope    |

Pending means no component is authorized to invent a local Liquid Glass recipe.

## Planned sequence

### PR 21 — Liquid Glass Visual Foundations

- Establish the official philosophy, vocabulary, constraints, and roadmap.
- Record the existing implementation boundary.
- Change no token, style, component, Storybook, Showcase, or Portfolio code.

### PR 22 — Glass Tokens

- Define primitive material ingredients and semantic material roles in light and dark themes.
- Map boundary, illumination, blur, fallbacks, motion, focus, shadow, and radius to existing scales.
- Publish deterministic CSS custom properties through the existing JSON token pipeline.
- Add automated validation and a token-only Storybook reference without migrating components.
- Defer final composited contrast and rendering measurements to the concrete PR 23 surfaces.

### PR 23 — Surface Primitives

- Implement a small, composable public surface API using PR 22 tokens.
- Make material, depth, fallback, and containment explicit and strongly typed.
- Add accessibility, reduced-preference, unsupported-filter, SSR, unit, and Storybook coverage.
- Avoid migrating existing product components in the same PR.

### PR 24 — Ambient Backgrounds

- Define tokenized, static ambient fields that make material context predictable.
- Limit palette combinations and rendering area.
- Provide Solid and reduced-effect paths.
- Validate responsive composition and paint cost.

### PR 25 — Buttons

- Evaluate material by variant, state, density, and context.
- Preserve native behavior, focus, loading, disabled, and danger semantics.
- Avoid applying glass to every button variant.

### PR 26 — Cards

- Reconciled the current variants with Solid, Glass Subtle, Glass and Glass Elevated.
- Migrated the foundational Card before its specialized compositions without a second family.
- Added component tokens plus fallback, reduced-motion, forced-colors, SSR and content coverage.
- Preserved all public names and semantics; no deprecation was required.

### PR 27 — Form Controls

- Added one CSS-class foundation for existing native input, textarea, select, checkbox, radio, and
  switch controls; no parallel Angular component family was created.
- Preserved native value accessors, typed Reactive Forms, semantic HTML, keyboard operation, and
  Portfolio submission behavior.
- Added component tokens, opaque compact-control materials, reduced-motion and forced-colors paths.
- Migrated real Portfolio, Showcase, and Storybook consumers and removed duplicated visual recipes.

### PR 28 — Navigation

- Migrated the existing `gh-navigation` selector, Header, primary items and mobile panel without a
  parallel family or Router coupling.
- Reused Icon Button for disclosure, preserved active route, Escape, focus restoration, Skip Link,
  locale/theme selectors, route focus and scroll restoration.
- Added `navigation.*` component tokens, bounded structural filters, opaque fallbacks,
  reduced-motion, forced-colors, SSR, Storybook and real shell coverage.

### PR 28.3 — Navigation Polish and QA

- Corrected measured Showcase sticky, Header-offset and 320 px containment inconsistencies without
  changing the public Navigation component.
- Aligned Showcase typography and touch-target sizing with existing Navigation component tokens.
- Consolidated duplicate Storybook aliases and the redundant Showcase motion demonstration.
- Recorded responsive, accessibility, browser and production validation boundaries before PR 29.
- Left Tabs, Breadcrumbs and Pagination unimplemented because no current public components exist.

### PR 28.1 — Navigation Material Refinement

- Preserves the PR 28 DOM, API, routing, keyboard and responsive behavior.
- Refines the Header into a floating capsule with token-authored layered light, subdued boundaries,
  medium blur and broad ambient depth.
- Reduces active-item weight and integrates Language and Theme selectors with the same material
  family without nested filters.
- Keeps solid fallback, forced colors, reduced motion and deterministic SSR behavior.
- Defers spring motion and advanced interaction; PR 28.2 may add only restrained CSS continuity.

### PR 28.2 — Navigation Motion & Interaction

- Adds component-specific duration, easing, pressed scale, opacity and constant-geometry shadow
  tokens while keeping compatibility aliases.
- Refines hover, active, focus and pressed states without animating the Header, blur or layout.
- Adds a CSS-only active indicator and Language Selector thumb with no measurement or runtime
  animation.
- Removes transforms and decorative travel for reduced motion and removes decorative animation in
  forced colors.
- Preserves the PR 28 DOM, API, routing, keyboard, responsive and deterministic SSR behavior.

### Proposed follow-up PRs

Sequence these only after the first component migrations provide evidence:

1. Alerts, toasts, and status feedback.
2. Dialog, overlay, popover, and tooltip primitives.
3. Badge, Tag, and other compact components.
4. Footer and remaining Brand Patterns.
5. Showcase integration and migration guidance.
6. Portfolio product migration.

## Gate for every implementation PR

- Uses only approved semantic tokens and public primitives.
- Documents material and depth choices.
- Works in light, dark, and system theme behavior.
- Preserves semantic HTML, keyboard operation, visible focus, and states.
- Includes Solid, unsupported-filter, reduced-motion, and reduced-transparency paths.
- Measures composited contrast in representative contexts.
- Measures production rendering and bundle impact against a baseline.
- Adds proportionate tests, Storybook states, and migration notes.
- Does not create product-specific content or local effect recipes in the library.

## Known risks

| Risk                                                            | Response                                                                    |
| --------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Existing `glass` APIs are mistaken for the final language       | Label them pre-migration and review them explicitly in PR 26                |
| Material tokens become raw opacity and blur utilities           | Name tokens by semantic material and role in PR 22                          |
| Light and dark themes drift                                     | Prototype and approve both together                                         |
| Contrast varies with the backdrop                               | Define approved ambient contexts and a Solid fallback                       |
| Filter use grows with component count                           | Centralize in a surface primitive and enforce performance gates             |
| Product migration begins before the library contract stabilizes | Keep Showcase and Portfolio changes in later dedicated PRs                  |
| The visual direction becomes derivative                         | Use the written moodboard and originality test                              |
| Decorative motion or glow becomes a default                     | Require purpose, reduced-motion behavior, and review against the principles |

## PR 22 recommendations

1. Audit existing Card roles without preserving their current names automatically.
2. Prototype Solid, Glass Subtle, Glass, Glass Elevated, and Glass Floating over approved light and
   dark ambient contexts.
3. Test text, icons, focus, status, selection, and disabled states after compositing.
4. Define semantic fallback aliases before defining blur values.
5. Keep material and depth tokens independent enough to support Solid floating surfaces.
6. Map the conceptual shadow and radius roles only after visual comparison.
7. Measure one surface, a repeated card grid, a dialog-sized surface, and a compact floating surface.
8. Reject raw utilities that let components assemble undocumented recipes.
9. Do not migrate Card, Hero, Showcase, or Portfolio in the token PR.
