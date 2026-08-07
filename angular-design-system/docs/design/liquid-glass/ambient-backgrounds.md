# Liquid Glass ambient backgrounds

This document defines the implementation and usage contract for `gh-ambient-background`. Ambient
backgrounds provide approved environmental color behind Surface primitives; they are decorative
context, not content, interaction, or a replacement for legible material boundaries. A product
Layout may own one Ambient Background as its shared environmental canvas, as defined by
[Floating Layout Integration](floating-layout.md).

## 1. Purpose

The primitive makes the relationship between environment and Liquid Glass predictable. It gives
glass something restrained to refract while preserving a Solid path for content that needs maximum
clarity. It is suitable for bounded heroes, sections, documentation demos, forms, and editorial
highlights.

## 2. Principles

- Content is perceived before color or material effects.
- One composition has one dominant color family and restrained support.
- Presets own recipes; consumers cannot choose raw color, position, blur, or opacity.
- Static behavior, small DOM, semantic tokens, and graceful fallback are defaults.
- Ambient paint never conveys state, focus, validation, status, or meaning by itself.

## 3. Architecture

```text
ambient.opacity.* primitives
            ↓
ambient.background.*, ambient.preset.*, ambient.intensity.* semantics
            ↓
            GhAmbientBackgroundComponent
            ↓
Layout or bounded composition owner
            ↓
projected native content and optional Surface composition
```

The repository `/tokens` directory remains the editable source. Generated theme CSS is consumed by
the component through public semantic custom properties; private `--_gh-ambient-*` properties only
select the current public state inside encapsulated CSS.

## 4. Tokens

The primitive scale contains only `ambient.opacity.{subtle|default|strong}`. Semantic themes expose
`ambient.background.{base|none}`, five `ambient.preset.*` compositions, and three
`ambient.intensity.*` aliases. Preset values reuse Lavender, Cloud Blue, Peach, Mint, Sand and the
existing theme backgrounds instead of duplicating the palette.

Gradient geometry lives in the semantic preset token. The component contains no local color,
gradient, opacity, blur, radius, shadow, spacing, or duration recipe.

## 5. Presets

| Preset   | Intent                                                    |
| -------- | --------------------------------------------------------- |
| `none`   | Stable wrapper with transparent background and no visual. |
| `subtle` | Quiet sections, documentation, forms, dense contexts.     |
| `brand`  | Lavender-led primary moments, demos and heroes.           |
| `cool`   | Cloud Blue-led technical and developer-tool context.      |
| `warm`   | Peach-led editorial, human and soft callout context.      |

`balanced` is omitted because it would duplicate `brand`. Neon, cyber, aurora and arbitrary custom
presets are outside the visual direction.

## 6. Intensity

`subtle`, `default`, and `strong` select a bounded opacity token without changing gradient
composition. `strong` is intentionally capped below fully opaque and must remain calm. The default
is `default`; the default preset is `subtle` because choosing an explicit environmental component
already communicates intent to render ambience.

## 7. Light theme

Ivory and the established subtle background anchor the light environment. Pastel fields remain
diffuse and low-noise; none of the presets uses pure white as its only environment. Deep Ink content
roles remain unchanged and Solid is preferred for dense reading.

## 8. Dark theme

Dark values are calibrated independently over the Ink-led blue-grey environment. Lavender, Blue,
Peach, Mint and Sand use lower mixes so they read as contained environmental light rather than neon
or gaming-style halos. Glass boundaries and foreground roles continue to come from Surface tokens.

## 9. System theme

There is no system preset or third token file. The existing theme architecture selects light or
dark semantic variables through CSS. Ambient Background does not inject the theme service or call
`matchMedia()`.

## 10. Mesh gradients

Each visual is a single CSS `background` value containing one to three radial gradients. There is
no SVG mesh, Canvas, WebGL, raster image, remote asset, blend-mode stack, or dependency. The base
semantic background paints independently beneath the gradient value, providing a solid fallback if
advanced color syntax is unsupported.

## 11. Glows

Soft radial gradients provide the required glow edge without `filter: blur`, huge box shadows, or
extra DOM children. `gh-ambient-glow` and `gh-gradient-orb` are intentionally omitted: the approved
presets cover the initial composition needs, while a public placement API would encourage competing
and inconsistent recipes. Reconsider only after at least two measured product use cases cannot be
expressed by presets.

## 12. Motion

The initial system is static and exposes no `motion` input. The motion and performance foundations
advise against routine continuous ambient animation, gradient-position animation, filter animation,
and visible autonomous movement. Motion must not be added merely to demonstrate technology.

## 13. Reduced motion

Because no motion ships, the component already works completely without animation. A
`prefers-reduced-motion: reduce` rule explicitly removes animation and transition from the visual
layer as a defensive contract for future internal evolution. Content and DOM do not change.

## 14. Reduced transparency

No interoperable reduced-transparency media query is available in the current web platform, and the
system does not invent a runtime preference. Consumers can choose `preset="none"` and a Solid
Surface today. The semantic boundary can support a future verified preference by remapping ambient
presets to `none` and glass materials to their opaque fallbacks without markup changes.

## 15. Forced colors

In `forced-colors: active`, the host uses `Canvas` and `CanvasText` and the decorative layer is not
displayed. The component does not opt out through `forced-color-adjust: none`. Projected native
controls retain their platform high-contrast behavior.

## 16. Responsive behavior

The host has no fixed width or height and projects naturally growing content. Its visual layer uses
the host bounds, so the same deterministic DOM works at 320, 375, 768, 1024 and 1440 pixels. Layout,
padding and breakpoint decisions remain consumer responsibilities. Long strings and data-heavy
content still require content-specific wrapping strategies.

## 17. SSR and hydration

The component uses signal inputs, static markup and CSS only. It has no services, subscriptions,
listeners, browser globals, capability detection, generated IDs, random values, viewport reads, or
theme branches. Server and client render the same visual and content nodes for every theme and
viewport, so hydration has no alternate structure to reconcile.

## 18. Performance

One instance renders one visual element, one content wrapper and at most three gradients. It uses no
filter, backdrop filter, image request, animation or runtime calculation. Keep one complex ambient
region above the fold, avoid applying it to every card, and measure real pages before expanding use.
Backdrop cost belongs to the Surface above it and should remain bounded and unnested.

## 19. Relationship with Surface

Ambient Background describes the environment; Surface describes content containment. Neither owns
the other's API. Approved starting combinations are:

- Ambient Subtle + Glass Subtle;
- Ambient Brand + Glass or Glass Elevated;
- Ambient Cool + Glass Floating for compact future floating UI;
- Ambient Warm + Solid for dense or contrast-sensitive content.

Glass is optional. A Solid Surface is often the better composition.

## 20. Nested backgrounds

Do not place one Ambient Background inside another. When Layout owns the ambient plane, Hero and
child sections must not mount another instance. Nesting multiplies paint, makes color hierarchy
unpredictable, and can reduce composited contrast. The component does not inspect ancestors at
runtime; review and documentation enforce the rule.

## 21. Public API

```ts
type GhAmbientPreset = 'none' | 'subtle' | 'brand' | 'cool' | 'warm';
type GhAmbientIntensity = 'subtle' | 'default' | 'strong';
```

| Input       | Default   |
| ----------- | --------- |
| `preset`    | `subtle`  |
| `intensity` | `default` |

There is no low-level color, blur, opacity, coordinate, gradient, motion, or containment input.
Visual paint is always bounded to the host without clipping projected focus rings or shadows.

## 22. Storybook

`Foundations/Ambient Backgrounds` is the canonical isolated API explorer. Controls cover only
preset and intensity. Stories cover presets, intensity, themes, responsive use, long content,
forms, Glass Panel, Solid and glass combinations, and preference fallbacks. Browser emulation is
used for reduced motion and forced colors; no duplicate motion story exists because motion is not a
public feature.

## 23. Showcase

The routed `Ambient Backgrounds` page demonstrates the public package API in the real standalone
application. It includes every preset and intensity, approved Surface combinations, form content,
Do/Don't guidance and resilience notes. The existing Showcase theme control supplies light, dark
and system verification. The shell and global application background are unchanged.

## 24. Examples

```html
<gh-ambient-background preset="brand" intensity="default">
  <gh-surface variant="glass" padding="lg">
    <h2>Selected work</h2>
    <p>Content remains semantic and readable.</p>
  </gh-surface>
</gh-ambient-background>
```

```html
<gh-ambient-background preset="warm" intensity="subtle">
  <gh-surface variant="solid" padding="lg">Dense editorial content</gh-surface>
</gh-ambient-background>
```

## 25. Do and don't

Do use one broad, bounded region, select the quietest suitable preset and intensity, preserve native
content semantics, test both themes, and pair uncertain content with Solid. Don't nest ambient
regions, override private variables, animate filters or gradients, place one behind every repeated
item, or let color replace semantic state.

## 26. Use cases

Good candidates include one homepage hero, a Showcase fixture, a bounded product overview,
technical documentation context, an editorial callout, or a form introduction. A plain semantic
background is preferable when ambience does not add hierarchy.

## 27. Cases that require Solid

Use Solid for long-form reading, data tables, complex forms, low-vision-sensitive content, unknown
consumer backdrops, unsupported filtering, forced colors, dense repeated lists, and any composition
where text or focus contrast becomes uncertain after compositing.

## 28. Risks

The main risks are decorative excess, duplicated local recipes, nested paint, excessive glass above
the field, theme drift, and treating token validity as proof of final composited contrast. Static
tests bound structure and recipes; Storybook and Showcase provide visual contexts; product adoption
still requires page-level contrast and performance measurement.

## 29. Recommendations for PR 25

Evaluate each Button variant over Solid and approved ambient/Surface combinations. Preserve the
native button, focus, loading, disabled and danger contracts. Do not make every button glass, copy
ambient tokens into Button, or add Button-specific environmental effects.

## 30. Recommendations for PR 26

Migrate foundational Card before specialized Cards. Compare current `glass` behavior with approved
Surface materials over these ambient presets, prefer Solid for dense/repeated grids, validate long
content and selected states, and remove local recipes only through an explicit compatibility
decision.
