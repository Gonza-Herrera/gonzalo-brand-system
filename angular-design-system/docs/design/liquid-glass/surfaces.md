# Surfaces, materials, and depth

Liquid Glass starts with a surface model. Material describes what a surface appears to be made of;
depth describes where it sits in the composition. They are related but not interchangeable. A solid
surface can float, and a subtle glass surface can remain close to the background.

No values or CSS recipes are defined in this document. PR 22 must turn only validated concepts into
semantic tokens.

## Material anatomy

A complete surface may contain five coordinated signals:

1. **Body** — the theme-aware material that contains content.
2. **Outer boundary** — the edge separating it from the environment.
3. **Inner highlight** — a restrained cue of thickness near the upper edge.
4. **Shadow** — the lower or outward separation created by depth.
5. **Reflection** — an optional, very subtle response to ambient color.

Not every surface needs every signal. One clear boundary plus one depth cue is often sufficient.
Adding all five does not make the material more correct.

## Material classification

| Material           | Character                                          | Appropriate use                                          | Avoid when                                                   |
| ------------------ | -------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| **Solid**          | Opaque, stable, quiet                              | Long content, dense data, complex forms, fallback states | A contextual relationship to the backdrop is essential       |
| **Glass Subtle**   | Minimal translucency and minimal backdrop response | Repeated cards, low-depth groups, calm chrome            | The backdrop is uncontrolled or contrast varies visibly      |
| **Glass**          | Balanced translucency, boundary, and soft depth    | Panels and selected feature surfaces                     | Large repeated regions make the effect the dominant language |
| **Glass Elevated** | Stronger containment and separation                | Dialogs, focused panels, temporary elevated regions      | The surface is part of ordinary page flow                    |
| **Glass Floating** | Compact, clearly detached, highest material focus  | Popovers, tooltips, floating controls                    | Persistent large content or dense reading                    |

Material names describe intent, not opacity or blur values. A future theme may achieve the same
intent with different compositing values.

## Depth scale

| Level       | Name       | Spatial meaning                                   | Typical role                                |
| ----------- | ---------- | ------------------------------------------------- | ------------------------------------------- |
| **Depth 0** | Background | Environmental canvas behind content               | Page background and future ambient fields   |
| **Depth 1** | Surface    | Stable content plane in normal flow               | Sections, cards, reading and data surfaces  |
| **Depth 2** | Elevated   | A surface lifted above neighboring content        | Selected panels, raised cards, local chrome |
| **Depth 3** | Floating   | Temporary or spatially detached UI                | Popovers, tooltips, floating controls       |
| **Depth 4** | Overlay    | Focus-isolating composition above the application | Dialog layer plus its supporting backdrop   |

Use the lowest level that communicates the relationship. Adjacent UI should normally move one level
at a time. Depth 4 is a composition: the focused surface and the backdrop that reduces competition
from lower layers. It is not a license to use the strongest shadow or blur.

## Selecting material and depth

1. Identify whether the content is reading, data, action, navigation, feedback, or temporary UI.
2. Choose the depth needed to explain its spatial relationship.
3. Start with Solid and select glass only when backdrop continuity adds meaning.
4. Test the material over the most demanding supported background in light and dark themes.
5. Confirm the solid fallback before approving translucency.
6. Measure the final rendered region and number of simultaneous surfaces.

Do not derive material mechanically from depth. A dialog may require Solid at Depth 4 for contrast;
a quiet card may use Glass Subtle at Depth 1.

## Transparency rules

- Transparency must never reduce text, icon, state, or focus contrast below the system's target.
- The intended backdrop is part of the design contract and must be known during validation.
- Content-bearing surfaces must not depend on a decorative image remaining unchanged.
- Nested transparent surfaces should be replaced by one shared material region or a solid child.
- Higher transparency is not synonymous with higher depth.
- Theme mappings may differ while preserving the same perceived containment.
- Reduced-transparency and unsupported-browser paths must become meaningfully Solid, not merely less
  blurred.

Transparency percentages are intentionally deferred to PR 22 prototypes.

## Blur rules

Blur supports material separation; it does not create the surface by itself.

| Blur class | Intended context                                              | Constraint                                               |
| ---------- | ------------------------------------------------------------- | -------------------------------------------------------- |
| **Small**  | Compact or low-depth material such as future inputs or chrome | Must not soften content or become visible as an effect   |
| **Medium** | Standard cards and panels                                     | Use one backdrop-filter region for the whole material    |
| **Large**  | Focused dialogs or overlays                                   | Reserved for measured cases with a strong solid fallback |

- Never choose the largest blur because it looks more premium.
- Never animate blur as a routine state transition.
- Avoid backdrop filtering on large lists, page-sized scrolling containers, and nested surfaces.
- A surface without backdrop support must remain visually complete.
- Blur naming remains conceptual until PR 22 establishes tested values.

## Border model

Liquid Glass boundaries are theme-aware and contextual.

- **Outer border:** separates material from its backdrop and supports non-text contrast.
- **Inner border or highlight:** suggests thickness without becoming a second outline.
- **Lower boundary:** may be slightly quieter or darker to reinforce the shared light direction.
- **State border:** hover, focus, selected, error, and disabled states override decorative lighting.

Do not use fully white borders in light or dark themes. Do not use fully black borders. Pure extremes
look pasted on, ignore ambient context, and can overpower the material. High-contrast modes may use
system colors instead of the visual border model.

## Radius and depth

Radius should reinforce containment and hierarchy:

- stable content surfaces use calm, familiar geometry;
- elevated and floating surfaces may use a more generous radius when their size allows it;
- nested surfaces must preserve visual continuity and leave sufficient inset between curves;
- compact controls must not inherit a large panel radius mechanically;
- pill geometry remains reserved for content and controls whose shape communicates a clear purpose.

Depth may influence radius selection, but content density, component size, and nesting take priority.
Exact mappings remain a PR 22 token decision.

## Use-case guidance

| UI category           | Starting material       | Depth guidance | Notes                                                |
| --------------------- | ----------------------- | -------------- | ---------------------------------------------------- |
| Long-form content     | Solid                   | Depth 1        | Preserve a quiet reading plane                       |
| Tables and dense data | Solid                   | Depth 1        | Keep rows stable and avoid repeated filters          |
| Complex forms         | Solid                   | Depth 1–2      | Validation and focus outrank atmosphere              |
| Repeated cards        | Solid or Glass Subtle   | Depth 1        | One shared ambient context; avoid nested glass       |
| Feature panel         | Glass                   | Depth 1–2      | Use only when backdrop continuity supports hierarchy |
| Navigation chrome     | Glass Subtle or Glass   | Depth 2        | Preserve link, active, and focus clarity             |
| Dialog                | Solid or Glass Elevated | Depth 4        | Focus isolation and text contrast are mandatory      |
| Popover or tooltip    | Glass Floating          | Depth 3        | Compact, temporary, and clearly bounded              |
| Toast or alert        | Solid or Glass Elevated | Depth 3        | Status meaning cannot depend on material color alone |

These are starting points, not implemented component variants. See the
[adoption roadmap](roadmap.md) for migration status.
