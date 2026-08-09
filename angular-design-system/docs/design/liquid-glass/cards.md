# Liquid Glass Card System

## 1. Objective

PR 26 migrates the existing Card family to the approved Liquid Glass language while preserving its
public API, selectors, projected slots, content models and native interaction. The result supports
Solid, Glass Subtle, Glass and Glass Elevated hierarchy without making every Card translucent.

## 2. Architecture

```text
GhCardComponent and composed Card intent
                    ↓
card.* component tokens
                    ↓
surface.* semantic material and state tokens
                    ↓
approved primitive scales
```

`GhArticleCardComponent`, `GhExperienceCardComponent` and `GhProjectCardComponent` continue to
compose one `GhCardComponent`. There is no parallel Liquid Glass Card family, runtime theme logic,
service or dependency.

## 3. Relationship with Surface

Card uses the style-reuse option rather than rendering `GhSurfaceComponent` internally. Its
component tokens alias the Surface material contract and its SCSS follows the same fallback,
feature-query, highlight and state model. An internal Surface wrapper would change the established
DOM, split projection regions and risk breaking media and slot layout. Consumers may still compose
a Solid Surface inside a Glass Card when dense nested content needs predictable contrast.

## 4. Component tokens

`card.*` owns padding, gaps, radii, border width, motion, typography, link focus, media geometry,
logo geometry and section/list spacing. Material groups `outlined`, `subtle`, `glass` and `elevated`
resolve from the Surface contracts and add Card-specific material/fallback backgrounds, reflections,
inner boundaries, filters and ambient shadows. `interactive.*` and `selected.*` alias Surface state
roles. Generated CSS is exposed as `--gh-card-*`; library Card styles consume no primitives.

The older broad `--gh-card-background`, `--gh-card-border`, `--gh-card-shadow` and related variables
remain generated because Portfolio patterns consume them. They are compatibility aliases, not the
new component implementation boundary.

## 5. Anatomy

The host contains one semantic `<article>`. Its children remain a media region followed by a body.
The body contains header, content, unmatched default projection and footer in that logical order.
Two pointer-inert pseudo-elements supply the tokenized upper/inner boundary and restrained
upper-left/right reflections. They remain behind projected content and add no DOM. The Card does not
add a Surface wrapper or fixed-height content container.

## 6. Slots

The static projection selectors remain `ghCardMedia`, `ghCardHeader`, `ghCardContent` and
`ghCardFooter`. They are selectors, not new directives. Unmatched content remains between content
and footer. Existing composed Cards keep their current markup and no projection is duplicated.

## 7. Material strategy

| Existing variant | Material                     | Intended use                                             |
| ---------------- | ---------------------------- | -------------------------------------------------------- |
| `outlined`       | Solid + Card recipe          | Default, dense, critical and predictable content         |
| `subtle`         | Glass Subtle + Card recipe   | Editorial grids, previews and secondary grouping         |
| `glass`          | Glass + Card recipe          | Concise feature content over an approved ambient context |
| `elevated`       | Glass Elevated + Card recipe | Prominent summaries and higher local depth               |

`interactive` and `selected` layer state over any of these materials. No new material input or
low-level blur, opacity, shadow, glow or border API is introduced.

## 8. Solid

`outlined` remains the safe default and never applies `backdrop-filter`. Use it for forms, long
reading, detailed professional history, critical information and uncontrolled backgrounds. Its
visible semantic border preserves hierarchy without depending on translucency.

## 9. Glass Subtle

`subtle` maps to Surface Glass Subtle. It provides quiet containment for editorial cards and
repeated preview grids. It has an opaque fallback and a bounded filter enhancement. Very large or
performance-sensitive lists should still prefer Solid if backdrop continuity adds little value.

## 10. Glass

`glass` maps to the balanced Surface Glass material. Reserve it for features, marketing summaries
or contact channels whose approved ambient background helps explain hierarchy. It is not the new
default and should not be nested inside another filtered region.

## 11. Elevated

`elevated` maps to Surface Glass Elevated and provides the highest depth in the Card family. Use it
for highlighted or floating-looking summaries and primary local actions, not every item in a grid.
It remains below the separate Glass Floating material reserved for future temporary UI.

## 12. Interactive

Interactive changes visual hover, active and `focus-within` feedback only. Hover is restricted to
hover-capable fine pointers; active uses the component offset; neither animates blur. Card never
adds `role="button"`, `tabindex`, a click listener or keyboard recreation. Native anchors and
buttons inside the Card own activation.

## 13. Selected

The existing `selected` input is preserved as visual state. It changes boundary, surface, ring and
shadow so selection is not indicated by color alone. Card cannot infer whether a consumer needs a
radio, checkbox, `aria-selected` or `aria-pressed`, so it adds none automatically. The semantic
control and selected value remain consumer responsibilities.

## 14. Disabled

The generic Card has never exposed `disabled`, and an `<article>` has no native disabled behavior.
PR 26 does not add a misleading API or disable descendants through CSS. Consumers must disable
their actual buttons, inputs or selection controls. A future domain component may add contextual
disabled behavior only with a defined semantic model.

## 15. Loading

No Card component currently exposes loading or `aria-busy`. PR 26 does not add a new loading API,
hide projected content or invent layout placeholders. A domain consumer may set `aria-busy` on its
own meaningful region while preserving dimensions; a shared pattern belongs to a later loading PR.

## 16. Media

Only `.gh-card__media` clips overflow, preserving focus rings, menus and shadows elsewhere. Composed
Article and Project Cards keep lazy loading, alternative-text ownership and stable aspect-ratio
regions. Project horizontal media keeps its reserved minimum geometry and returns to vertical with
CSS on narrow screens. Glass paint is not overlaid on images.

## 17. Horizontal layout

The existing `GhProjectCardComponent` `orientation="horizontal"` API and DOM order are unchanged.
CSS establishes media/content columns and collapses them to a vertical composition on smaller
viewports. There is no JavaScript viewport detection, reordered reading sequence or fixed height.

## 18. Feature cards

There is no separate Feature Card component. Existing `featured` Article and Project data and the
Experience `highlighted` input continue to map their base Card to `elevated`. Consumers may compose
a concise feature with base `variant="glass"` when an ambient context is intentional. This avoids
a duplicate family while preserving established typed models.

## 19. Stat cards

No Stat Card exists in the public API. Showcase and Storybook demonstrate a metric as ordinary
header/content/footer projection on a Subtle Card. This is documentation, not a new selector or
data model. A dedicated component should be considered only if repeated product semantics provide
evidence for one.

## 20. Light, dark and system

Light and dark generated themes contain the same Card token keys and alias structure. Their
referenced Surface and text roles supply theme-specific values. System mode remains the existing
CSS media-query strategy. Card never detects theme in TypeScript and renders identical DOM in all
three modes.

## 21. Solid fallback

Every Glass-capable variant paints its material-specific opaque `fallbackBackground` before an
`@supports` query applies the translucent background and composed backdrop filter. JavaScript is
not used for capability detection. Border, foreground, shadow, selected and focus treatment remain
available when filters are unsupported.

## 22. Reduced motion

`prefers-reduced-motion: reduce` removes Card transitions and hover/active translation. Background,
border, focus and selected feedback remain visible. There is no skeleton shimmer or JavaScript
animation to stop, and `backdrop-filter` is never part of the transition list.

## 23. Forced colors

In `forced-colors: active`, material paint becomes `Canvas`/`CanvasText`, the boundary uses
`ButtonBorder`, filters resolve to the no-filter token and the decorative pseudo-element is hidden.
Focus and selected use `Highlight`, maintaining structural distinction. Card does not use
`forced-color-adjust: none`.

## 24. Accessibility

- The root remains an article and neutral Cards stay outside the tab order.
- Heading levels remain controlled by projected content or existing composed-Card inputs.
- Native links, buttons, radios and checkboxes keep their platform keyboard behavior.
- `focus-within` complements rather than removes the native control outline.
- Selection uses a non-color visual indicator but still requires consumer semantics.
- Media alternative text, localized labels and external-link treatment remain unchanged.

Automated checks cover structure and native behavior. They do not establish universal WCAG
conformance, screen-reader behavior across platforms or contrast over every possible background.

## 25. Performance

The migration adds no listener, service, dependency, runtime style generation, theme detection,
ripple or glow. Solid never filters. Glass variants create at most one bounded filter, three
token-authored material layers and one two-layer reflection overlay; blur is not animated. Use Solid
or Glass Subtle for large grids, avoid nested Glass and measure product rendering before expanding
filtered regions.

## 26. Responsive

Cards have no fixed content height and allow text, lists, actions and metadata to wrap. Footer
actions use tokenized flex gaps; media and horizontal layouts collapse through CSS. Storybook and
Showcase provide mobile, long English/Spanish, form, media and horizontal examples. Manual release
review covers 320, 375, 768, 1024 and 1440 CSS pixels plus 200% zoom.

## 27. SSR

Card uses signal inputs and deterministic class/data-attribute computation only. It does not access
browser APIs, create random IDs, inspect theme or viewport, or branch on filter support in Angular.
A focused `renderApplication` test covers every projection region, material/state attributes and a
native action. Portfolio prerender remains the hydration integration gate.

## 28. Do / Don't

Do use Solid for dense content, Glass selectively for features, one material level per Card, native
controls, visible headings, stable media dimensions and wrapping actions. Don't convert every Card
to Glass, nest filtered materials, attach `(click)` as the only interaction, animate blur, truncate
essential content, set fixed heights, add exaggerated glow or place multiple competing Primary
Buttons in one footer.

## 29. Migration notes

Selectors, standalone imports, exported types, inputs, defaults, projection selectors and composed
Card models are unchanged. `outlined`, `subtle`, `glass` and `elevated` retain their names but now
map to Solid, Glass Subtle, Glass and Glass Elevated. New `data-*` attributes expose deterministic
state for inspection without adding semantics. No deprecations or consumer source changes are
required.

## 30. Portfolio considerations

Portfolio source is not redesigned. Existing usage inherits the centralized visual mapping:
default Article, Project and Experience Cards remain Solid; featured/highlighted cases inherit
Elevated; explicitly Glass and Subtle base Cards retain those intentions. Contact form remains
Solid, while its configured channel may remain Subtle. Legacy Card tokens stay available for the
existing page-hero pattern. Regression builds, tests, prerender and manual page review are required.

## 31. Recommendations for PR 27

Migrate form controls with their own component tokens rather than styling inputs through Card.
Preserve native form semantics, label association, autocomplete, validation messages, disabled and
readonly distinctions, touch targets and focus visibility. Start fields on Solid, measure any Glass
field proposal over approved contexts, reuse Card only as a containing surface, and do not make
form-control state dependent on the Card material.
