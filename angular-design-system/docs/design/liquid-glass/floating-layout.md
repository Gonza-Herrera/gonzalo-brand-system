# Floating Layout Integration

## 1. Objective

PR 28.15 integrates the existing floating Navigation with the application layout so Header, Main,
Hero and the first content section are perceived on one continuous environmental canvas. The
Header remains a bounded Liquid Glass capsule; this work does not redesign Navigation, Hero or any
business component.

## 2. Observed diagnosis

The implementation was inspected in source and in the running Portfolio at 1440 × 900 before the
change. The measured layout was:

- `body` painted the solid light background `rgb(247, 244, 241)`;
- the Navigation occupied `top: 8px` through `bottom: 74px`;
- `main` was transparent but began exactly at `top: 74px`;
- the first `gh-hero` also began exactly at `top: 74px`;
- `.gh-hero__section` painted `--gh-pattern-accent-gradient` and used `overflow: hidden`.

The first visual cut therefore occurred at 74 px, where the Header's normal-flow box ended and the
Hero-owned gradient began. Main was not the cause: it already had a transparent computed
background. The separation came from background ownership and exact edge adjacency, not from
routing, JavaScript, z-index or a duplicated Header border.

## 3. Before and after

Before:

```text
body solid background
├── Navigation
└── Main (transparent)
    └── Hero (owns gradient and clips it to its section)
```

After:

```text
body fallback
└── Portfolio Shell
    ├── Ambient Background (single owner)
    │   └── continuous content plane
    │       ├── Floating Header
    │       └── Main (transparent)
    │           ├── Hero (content and rhythm only)
    │           └── Sections
    └── Footer
```

## 4. Background ownership

`PortfolioShellComponent` owns one public `gh-ambient-background` instance with the approved
`brand/default` recipe. The instance begins at the shell's top edge, behind Navigation, and grows
with Main. Its existing decorative visual remains absolute, pointer-inert and `aria-hidden`.

No second ambient instance is mounted in Hero or child pages. `body` keeps the foundational solid
background only as the document fallback beneath the shell and Footer; it does not paint another
ambient recipe.

## 5. Main integration

Main remains in normal flow, grows to available height and explicitly stays transparent. It does
not establish a new surface, stacking context or clipping boundary. An `--gh-space-sm` logical
block offset separates its content rhythm from the Header without positioning either region or
measuring Header height.

The shell keeps `overflow: visible`, so the Header's broad shadow and focus rings are not clipped.
Horizontal containment remains the responsibility of the existing Container and content patterns.

## 6. Hero integration

Portfolio's existing Hero instances retain their content, actions, responsive grid, headings and
public `surface` input. A Portfolio-only global integration rule makes the internal Hero section
transparent while it is inside `main#main-content`. This is necessary because the background must
belong to Layout without changing Hero's public API or internal component stylesheet.

Hero therefore continues to own semantic structure and vertical spacing, but no longer establishes
the primary visual plane. Later Section surfaces remain intentional content regions rather than
duplicate ambient backgrounds.

## 7. Header integration

Navigation keeps its current DOM, capsule radius, material, border, shadow, sticky behavior,
z-index and motion contract. The shell only supplies layout context:

- block-start inset uses `--gh-space-md` plus `env(safe-area-inset-top)`;
- inline inset uses `--gh-space-md` plus both inline safe areas;
- Header and Hero continue to use the shared `wide` Container maximum;
- the Header remains in normal flow and sticky, never fixed or manually offset.

The increased top inset adds restrained breathing room. The soft existing Navigation shadow now
falls over the ambient canvas, so it creates depth without reading as a lower divider.

## 8. Ambient Background

The `brand` preset provides Lavender, Cloud Blue and Peach fields over the theme-aware ambient base.
The gradient spans the shell content rather than ending at the Header or Hero boundary. Light and
dark themes reuse their generated semantic mappings; forced-colors continues to remove decorative
paint through the existing Ambient Background component contract.

No gradient position, color, opacity or blur is authored in Portfolio CSS.

## 9. Spacing and alignment

Only existing semantic and primitive spacing variables are used. There is no hard-coded Header
height or compensating negative margin. Navigation and Hero retain the same `container.wide`
ceiling and responsive Container gutters. The Main offset is intentionally smaller than Hero's own
section padding, preserving the established content rhythm rather than creating a large empty band.

## 10. Responsive and safe areas

The layout is CSS-only and remains fluid at the required validation widths:

| Width     | Expected integration                                                               |
| --------- | ---------------------------------------------------------------------------------- |
| 320       | Inset capsule, mobile disclosure, no horizontal overflow.                          |
| 375       | Safe touch targets and continuous ambient paint.                                   |
| 768       | Tablet composition with unchanged Hero flow.                                       |
| 1024      | Desktop boundary uses compact spacing aliases for translated copy, without a seam. |
| 1440      | Shared wide alignment and suspended Header depth.                                  |
| UltraWide | Header remains bounded by `container.wide`; ambience can fill the viewport.        |

Notch and rounded-display insets are handled with logical Header spacing and safe-area environment
variables. The layout does not read viewport dimensions in TypeScript.

## 11. Scroll behavior

The Header retains the existing sticky contract. Scrolling changes only its viewport relationship;
it does not swap backgrounds, add a divider or create a new surface. Because Header and Main are
children of the same Ambient Background, no ownership boundary appears when content moves beneath
the capsule.

## 12. SSR and hydration

The new hierarchy uses an existing standalone component, static inputs and deterministic markup.
There are no browser globals, generated IDs, measurements, listeners, observers, platform branches
or client-only classes. Server and client render the same Ambient Background, Header, Main and Hero
hierarchy, preserving prerender and hydration behavior.

## 13. Performance

The integration adds one existing Ambient Background instance: one decorative element, one content
wrapper and at most three static radial gradients. It adds no dependency, image request, filter,
animation, `IntersectionObserver`, `ResizeObserver` or JavaScript listener. The only persistent
backdrop filter remains the existing Navigation material.

## 14. Storybook and Showcase

`Foundations/Ambient Backgrounds` includes the named Floating Layout, Ambient Layout, Header
Integration and Hero Integration stories. They compose the public Ambient Background, Navigation,
Hero, Section and Container APIs on one canvas.

Showcase `/layout` contains the same hierarchy plus an ownership summary. It is documentation-only
markup and does not create a new public Layout component.

## 15. Comparison with the approved direction

The implementation now matches the approved qualitative direction in the important relationships:
the environmental paint starts behind the Header, no plane begins at Hero's top edge, the Header
keeps visible viewport air, and its shadow reads against the same Lavender/Blue/Peach canvas seen by
Hero and the first section.

Intentional remaining differences are the native Theme select chrome, browser-dependent backdrop
filter rendering and conservative existing shadow/gradient budgets. Project and content detail
routes may intentionally render a solid contextual back-link or reading section before later
content; those semantic content surfaces are not ambient duplicates. No pixel-perfect claim is
made because the repository contains no raster measurement source for the approved mockup.

## 16. Good practices

- Mount one Ambient Background at the layout owner, not one per page section.
- Keep Main and the leading Hero transparent.
- Preserve natural flow; do not calculate Header offsets in JavaScript.
- Use safe-area environment variables together with spacing tokens.
- Keep Navigation z-index values and material tokens unchanged.
- Allow Header shadows and focus outlines to remain unclipped.
- Use Solid Section surfaces for dense content when they express hierarchy.
- Validate light, dark, system, both locales, scroll and every target viewport.
