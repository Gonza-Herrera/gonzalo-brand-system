# Liquid Glass principles

These principles are normative. Future token, primitive, component, pattern, Storybook, Showcase,
and Portfolio work must be reviewable against them.

## 1. Surface first

The material and purpose of a surface come before decorative effects.

- Define the surface's role, content, boundary, and fallback before selecting translucency or blur.
- Treat Solid as a first-class material.
- Do not use blur alone to imply a material.
- Do not add an effect to a component that does not need spatial hierarchy.

Review question: would the surface still be understandable and well composed if all effects were
removed?

## 2. Content first

Legibility, interaction, and meaning always outrank atmosphere.

- Text and controls must retain their intended contrast after final compositing.
- Important information must not depend on seeing the backdrop through a surface.
- Focus, selection, disabled, error, and loading states must remain explicit.
- A busy or unknown backdrop requires stronger material containment or a Solid surface.

Review question: can a user read, navigate, and understand the content before noticing the material?

## 3. Depth without noise

Depth should be felt as quiet hierarchy, not presented as decoration.

- Use the lowest depth that communicates the relationship.
- Prefer one clear elevation step between neighboring surfaces.
- Avoid stacks of unrelated shadows, borders, glows, and gradients.
- Reserve higher depth for temporary, focused, or floating UI.

Review question: does depth explain where the surface belongs, or does it only make the composition
busier?

## 4. Soft transitions

Motion should preserve continuity and orientation without delaying work.

- Animate meaningful changes of state or spatial relationship.
- Keep hover and focus feedback prompt.
- Avoid bounce, overshoot, continuous shimmer, and animated blur as defaults.
- Preserve the end state when motion is reduced or removed.

Review question: does the transition help the user follow a change?

## 5. Accessible by default

Glass is optional; access to content and controls is not.

- Validate contrast against the actual rendered composition in both themes.
- Keep focus visible and independent of translucency.
- Preserve native semantics, keyboard operation, zoom, and assistive-technology behavior.
- Provide solid fallbacks for high contrast, reduced transparency, and unsupported effects.

Review question: does the same task remain clear when transparency and motion are absent?

## 6. Performance matters

Rendering cost is part of the design, not a later implementation detail.

- Minimize backdrop-filter regions and never nest them without measured justification.
- Avoid glass across large scrolling collections or full-screen regions by default.
- Do not animate blur, large shadows, or ambient layers continuously.
- Measure representative mobile and desktop hardware before accepting a material.

Review question: has the most expensive visual property earned its cost?

## 7. Consistency over creativity

Every surface must look like part of one system.

- Select only documented materials and depth levels.
- Consume semantic tokens instead of local effect recipes.
- Keep the light source, border behavior, radius logic, and motion rhythm consistent.
- Introduce a new material only through a foundation-level decision, not inside a component PR.

Review question: could another team reproduce the result from the documented contract alone?

## Decision order

When a design requires a trade-off, decide in this order:

1. Semantic structure and task completion.
2. Text, control, state, and focus legibility.
3. Responsive layout and content hierarchy.
4. Rendering resilience and performance.
5. Material and depth.
6. Decorative reflection, tint, or glow.

The lower item must yield whenever it compromises a higher one.
