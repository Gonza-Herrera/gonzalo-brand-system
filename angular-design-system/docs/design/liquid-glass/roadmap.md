# Liquid Glass adoption roadmap

The migration is incremental. Documentation establishes the contract; tokens and primitives prove
it; components adopt it only after accessibility and performance gates pass. No PR should combine a
foundation change with a broad product migration.

## Current component status

| Area                                   | Status after PR 21                                  | Intended future review                        |
| -------------------------------------- | --------------------------------------------------- | --------------------------------------------- |
| Global foundations and themes          | PR 22 token contract available; product unchanged   | PR 23 surface consumption                     |
| Surface primitive                      | Not implemented                                     | PR 23                                         |
| Ambient backgrounds                    | Not implemented                                     | PR 24                                         |
| Button                                 | Pending; existing component unchanged               | PR 25                                         |
| Foundational Card                      | Pending; existing `glass` variant is pre-migration  | PR 26                                         |
| Article, Experience, and Project Cards | Pending; inherit no new material yet                | After foundational Card approval              |
| Forms and form controls                | Pending; Portfolio native controls unchanged        | Dedicated forms PR                            |
| Navigation and Footer                  | Pending; existing pattern tokens unchanged          | Dedicated chrome PR                           |
| Hero and Content Highlight             | Pending; existing glass/gradient surfaces unchanged | Pattern migration PR                          |
| Badge and Tag                          | Pending                                             | Compact component review                      |
| Alerts, toasts, and status feedback    | Pending; not currently public                       | Feedback component PR                         |
| Dialogs and overlays                   | Pending; not currently public                       | Overlay primitives PR                         |
| Popovers and tooltips                  | Pending; not currently public                       | Floating surface PR                           |
| Storybook documentation                | Token-only foundation reference in PR 22            | Add Surface stories with PR 23 implementation |
| Showcase                               | Unchanged                                           | Integrate approved primitives after PR 23     |
| Portfolio                              | Unchanged                                           | Product migration only after library adoption |

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

- Reconcile the current `glass` variant with the approved material taxonomy.
- Migrate the foundational Card before specialized Cards.
- Validate large grids, long content, interactive states, and selected state.
- Remove or deprecate pre-migration behavior only through an explicit API decision.

### Proposed follow-up PRs

Sequence these only after the first component migrations provide evidence:

1. Navigation and persistent chrome.
2. Dialog, overlay, popover, and tooltip primitives.
3. Forms and validation-heavy controls.
4. Alerts, toasts, and status feedback.
5. Badge, Tag, and other compact components.
6. Brand Patterns.
7. Showcase integration and migration guidance.
8. Portfolio product migration.

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
