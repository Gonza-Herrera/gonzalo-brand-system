# Liquid Glass Foundations

## Definition

Liquid Glass is the material language for the next phase of the Gonzalo Herrera Design System. It
uses controlled translucency, restrained depth, soft illumination, and stable geometry to make a UI
surface feel physical without competing with its content.

The result should communicate clarity, calm, sophistication, technology, precision, simplicity, and
elegance. A surface should feel constructed from a material with thickness, boundary, lighting,
shadow, and context—not like an effect applied to a transparent container.

Liquid Glass extends the established visual DNA:

- premium simplicity and generous space;
- calm, technical composition;
- Manrope and Inter with strong hierarchy and readable measures;
- Ivory, Lavender, Peach, Cloud Blue, Deep Ink, Mint, Sand, and Sky;
- light and dark themes with the same semantic intent.

It does not replace the brand palette, typography, spacing, or existing theme architecture.

## What it is not

Liquid Glass is not:

- a copy of another company's interface;
- classic glassmorphism built around high transparency and heavy blur;
- a universal variant for every component;
- a reason to add glow, saturation, gradients, or animation;
- neumorphism or an attempt to remove visible boundaries;
- a substitute for hierarchy, spacing, typography, or semantic structure.

If the first thing a user notices is the glass effect, the treatment is too strong.

## Why this direction

The existing system already values calm technology, premium simplicity, clean typography, soft
gradients, and theme-aware surfaces. Liquid Glass provides a shared vocabulary for adding depth to
that foundation without fragmenting it into component-specific visual experiments.

The language was chosen to:

- make hierarchy perceptible while keeping layouts quiet;
- connect soft brand color with technical precision;
- support light and dark themes through the same material intent;
- establish constraints before the component catalogue migrates;
- make accessibility and rendering cost part of visual decision-making.

## When to use it

Consider a glass material when all of the following are true:

- the surface benefits from being visually related to an ambient layer behind it;
- depth communicates hierarchy, temporary elevation, or spatial context;
- the content remains readable against every supported background and theme;
- a solid fallback preserves the same meaning and interaction;
- the rendering cost is proportionate to the size, count, and lifetime of the surface.

Typical candidates include selected cards, compact panels, navigation chrome, dialogs, popovers,
tooltips, and other temporary floating surfaces. These are candidates only; the roadmap must approve
each component before implementation.

## When not to use it

Prefer a solid material for:

- long-form reading and dense editorial content;
- large tables, data-heavy views, and repeated rows;
- complex forms or validation-heavy workflows;
- surfaces placed over uncontrolled photography or high-frequency imagery;
- very large scrolling regions or long virtualized collections;
- environments where transparency or backdrop filtering is unavailable or reduced;
- any case where the effect weakens contrast, focus, state recognition, or performance.

Solid is an intentional material in the system, not a degraded version of glass.

## Benefits

- A consistent vocabulary for material, depth, illumination, and motion.
- Stronger hierarchy without relying on louder color or heavier borders.
- A visual bridge between the brand's human warmth and engineering precision.
- Predictable migration decisions across components and products.
- Explicit fallback rules for accessibility, browser support, and performance.

## Limitations

- Perceived appearance depends on the surface's backdrop and compositing context.
- Backdrop filtering can increase paint, memory, and GPU cost.
- Transparency makes contrast validation contextual rather than value-only.
- Nested materials can create visual noise and unpredictable rendering.
- Forced colors, reduced transparency, low-power devices, or unsupported browsers require solid
  behavior.
- Static hosting cannot solve runtime rendering cost through a server implementation.

## Scope and current status

This foundation is conceptual. It defines no CSS values, token names, component APIs, theme maps,
or animations. PR 22 will translate approved concepts into tokens after contrast and performance
prototypes.

The current Card and Hero `glass` variants are evidence of earlier restrained experimentation. They
are not changed by PR 21 and are not automatically classified as the future `Glass` material. Their
eventual status must be decided through the same adoption gates as every other component.

Continue with [Principles](principles.md), [Surfaces](surfaces.md), and the
[Adoption roadmap](roadmap.md).
