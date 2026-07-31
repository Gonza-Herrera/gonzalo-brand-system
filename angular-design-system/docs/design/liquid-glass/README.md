# Liquid Glass documentation

This directory is the normative visual reference for the Gonzalo Herrera Design System's Liquid
Glass phase. It defines the language before tokens, primitives, components, or products adopt it.

PR 21 established the documentation-only direction, PR 22 added the token contract, and PR 23
provides the reference Surface primitives. The existing `glass` variants in Card and Hero predate
this language, remain unchanged, and must not be treated as reference implementations until a later
migration PR reviews them against these foundations.

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

## How to use these documents

The words **must**, **should**, and **may** indicate requirement, recommendation, and permission.
When documents appear to conflict, use this priority:

1. Content legibility and accessibility.
2. Performance and platform resilience.
3. Surface and depth consistency.
4. Decorative expression.

No visual effect is required when it would violate a higher-priority rule. Future implementation PRs
must link to the relevant rule, use semantic tokens, and document any intentional exception.
