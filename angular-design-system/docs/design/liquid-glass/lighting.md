# Lighting, color, and elevation

Lighting gives a Liquid Glass surface thickness and position. The system uses one calm, diffuse
environmental light rather than independent lighting recipes per component.

## Light direction

The visual model assumes soft illumination from above with a restrained lateral bias shared by the
whole application. Physical light does not mirror when text direction changes.

A surface may express that model through:

- a quiet highlight along the upper boundary;
- slightly stronger separation along the lower boundary;
- a soft shadow extending below and away from the surface;
- a restrained reflection near one edge or corner;
- ambient brand color visible through, not painted on top of, the material.

The cues must agree. A top highlight paired with an upward shadow or several competing reflections
breaks the illusion of one material environment.

## Lighting hierarchy

Apply lighting in this order:

1. Establish a readable surface body.
2. Create a clear outer boundary.
3. Add the minimum shadow required by depth.
4. Add an inner highlight only if it improves perceived thickness.
5. Add reflection only when the backdrop and composition justify it.

Remove the lowest item first when a surface becomes noisy.

## Shadow scale

The future shadow system uses five conceptual roles:

| Role                | Purpose               | Appropriate use                         | Avoid                                         |
| ------------------- | --------------------- | --------------------------------------- | --------------------------------------------- |
| **Shadow XS**       | Local edge separation | Compact controls and Depth 1 boundaries | Treating it as an interactive state by itself |
| **Shadow SM**       | Stable surface lift   | Cards and quiet panels                  | Applying it to every nested child             |
| **Shadow MD**       | Clear local elevation | Selected panels and navigation chrome   | Large repeated lists                          |
| **Shadow LG**       | Focused separation    | Dialogs and large elevated surfaces     | Ordinary page sections                        |
| **Shadow Floating** | Compact detachment    | Popovers, tooltips, floating controls   | Large persistent content                      |

Shadows must be theme-aware, soft, and tinted by their environment rather than pure black. They must
not be stacked to simulate depth. Border, shadow, and backdrop should work as one signal.

The current `small`, `medium`, and `large` shadow primitives remain unchanged. PR 22 must decide
whether and how the conceptual roles map to new or existing tokens after visual and performance
validation.

## Brand color in materials

The established palette remains the source of truth:

- **Ivory** is the warm light-theme environment and neutralizes the material.
- **Deep Ink** provides structure, readable text, and dark-theme depth.
- **Lavender** expresses AI and the primary brand accent.
- **Cloud Blue** expresses technology and can cool ambient depth.
- **Soft Peach** expresses human leadership and warms ambient depth.
- **Mint, Warm Sand, and Sky** are supporting environmental accents.

Brand color should normally live behind or around a translucent material as a diffuse environmental
influence. It should not become a saturated transparent fill behind body text. A single composition
should have one dominant ambient family and, at most, a restrained supporting family.

Material does not change semantic color meaning. Status, focus, selection, danger, and action roles
continue to use their semantic tokens and cannot be replaced by an ambient tint.

## Reflections and glow

A reflection is a quiet response to the environment, not a decorative streak.

- Keep reflections away from text and control labels.
- Use one restrained reflection per material region, if any.
- Do not use a reflection to define a boundary that contrast should define.
- Avoid animated highlights, cursor-following light, and continuous shimmer.
- Glow is reserved for rare emphasis and must remain subordinate to content and focus.

When a reflection or glow is noticed before the surface content, remove it.

## Light theme

The light theme should feel airy, clean, luminous, and deep.

- Ivory remains the environmental anchor; glass should not collapse into flat white.
- Shadows stay soft and warm-neutral rather than grey or black cut-outs.
- Upper highlights must remain visible without becoming white outlines.
- Pastel ambient color is diffuse and low-noise.
- Text and controls retain the established Deep Ink hierarchy.
- Solid surfaces remain available for reading and dense work.

Depth in light mode comes from coordinated boundary, tone, and shadow—not from increasing
transparency.

## Dark theme

The dark theme should feel elegant, sophisticated, and deep without becoming completely black.

- Deep blue-grey surfaces preserve the existing Ink-led character.
- Boundaries use controlled light contrast, never fully white outlines.
- Shadows remain meaningful through surrounding separation rather than only darker values.
- Lavender, Blue, and Peach should appear as low-intensity ambient light, not neon glow.
- Text stays crisp and does not inherit transparency from its container.
- Elevated surfaces become more contained when required; they do not simply become more transparent.

Dark theme is an independent material calibration, not an inverted light theme.

## Ambient backgrounds

PR 24 defines controlled ambient backgrounds through `gh-ambient-background` and the semantic
`ambient.*` contract. Component work must consume that primitive rather than inventing large
gradients, glow fields, or blurred color blobs solely to make glass visible. A material must also
work over the current semantic backgrounds and a Solid fallback. See
[Ambient backgrounds](ambient-backgrounds.md).

## Visual inspection sequence

For every future implementation:

1. Inspect the surface without shadow, reflection, or blur.
2. Verify text, focus, controls, and states in light and dark.
3. Add the documented depth cue.
4. Add translucency only over an approved ambient context.
5. Remove each optional lighting layer in turn and keep only layers that add meaning.
6. Recheck reduced-transparency, forced-colors, and unsupported-filter fallbacks.
