# Liquid Glass documentation

This directory is the normative visual reference for the Gonzalo Herrera Design System's Liquid
Glass phase. It defines the language before tokens, primitives, components, or products adopt it.

PR 21 established the documentation-only direction, PR 22 added the token contract, PR 23 provides
the reference Surface primitives, PR 24 provides controlled ambient backgrounds, PR 25 migrated
actions, PR 26 migrates the existing Card family, and PR 27 provides the native Form Control
foundation. Hero's existing `glass` variant still predates this language and is not a reference
implementation until its dedicated migration.

## Reference map

1. [Liquid Glass Foundations](liquid-glass.md) — definition, intent, scope, benefits, and limits.
2. [Principles](principles.md) — the seven rules that govern every future decision.
3. [Surfaces](surfaces.md) — materials, depth, transparency, blur, borders, radii, and use cases.
4. [Lighting](lighting.md) — illumination, shadow hierarchy, brand color, and theme behavior.
5. [Motion](motion.md) — continuity, timing, easing, and reduced-motion rules.
6. [Accessibility](accessibility.md) — contrast, focus, input, assistive technology, and fallbacks.
7. [Performance](performance.md) — rendering constraints, measurement, and degradation strategy.
8. [Do and don't](dos-and-donts.md) — reviewable examples of acceptable and excessive treatment.
9. [Moodboard direction](moodboard.md) — materials, atmosphere, composition, and originality.
10. [Adoption roadmap](roadmap.md) — component status, sequencing, gates, and migration risks.
11. [Design tokens](tokens.md) — primitive scales, semantic materials, theme mappings, fallbacks,
    and the public CSS contract for PR 23.
12. [Surface primitives](surface-primitives.md) — Angular API, composition, states, fallbacks,
    accessibility, performance, and reuse policy.
13. [Ambient backgrounds](ambient-backgrounds.md) — controlled environmental presets, tokens,
    composition, fallbacks, accessibility, responsive behavior, and performance.
14. [Buttons](buttons.md) — Button and Icon Button component tokens, hierarchy, native semantics,
    state behavior, fallback policy, accessibility, performance, and migration notes.
15. [Cards](cards.md) — the compatible Card material mapping, anatomy, slots, native interaction,
    fallback, themes, accessibility, performance, composition and Portfolio considerations.
16. [Form controls](form-controls.md) — native control classes, component tokens, states, Angular
    Forms compatibility, fallbacks, accessibility, performance, and migration guidance.

## How to use these documents

The words **must**, **should**, and **may** indicate requirement, recommendation, and permission.
When documents appear to conflict, use this priority:

1. Content legibility and accessibility.
2. Performance and platform resilience.
3. Surface and depth consistency.
4. Decorative expression.

No visual effect is required when it would violate a higher-priority rule. Future implementation PRs
must link to the relevant rule, use semantic tokens, and document any intentional exception.
