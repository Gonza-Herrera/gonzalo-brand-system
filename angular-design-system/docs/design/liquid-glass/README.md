# Liquid Glass documentation

This directory is the normative visual reference for the Gonzalo Herrera Design System's Liquid
Glass phase. It defines the language before tokens, primitives, components, or products adopt it.

PR 21 established the documentation-only direction, PR 22 added the token contract, PR 23 provides
the reference Surface primitives, PR 24 provides controlled ambient backgrounds, PR 25 migrated
actions, PR 26 migrates the existing Card family, PR 26.1 refines its suspended Glass material,
PR 27 provides the native Form Control
foundation, PR 28 migrates Navigation and its real shells, and PR 28.1 refines Navigation material
without changing its architecture. PR 28.2 adds restrained CSS-only Navigation motion while keeping
the Header, routing and SSR behavior stable. PR 28.15 moves ambient ownership to the application
Layout so the floating Header and transparent Hero share one continuous canvas. Hero's existing
`glass` variant still predates this language and is not a reference implementation until its
dedicated migration.

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
17. [Navigation](navigation.md) — global and local navigation boundaries, Header and mobile
    materials, active/focus behavior, selectors, Skip Link, SSR, performance, and migration notes.
18. [Navigation material refinement](navigation-material-refinement.md) — floating geometry,
    layered light, boundaries, shadows, selectors, fallbacks, comparison and PR 28.2 guidance.
19. [Navigation motion](navigation-motion.md) — philosophy, timing, easing, hover, pressed, focus,
    active continuity, selector thumbs, reduced motion, forced colors and performance.
20. [Floating layout integration](floating-layout.md) — measured diagnosis, layout hierarchy,
    background ownership, Header and Hero integration, safe areas, responsive behavior, SSR and
    performance.
21. [Navigation polish and QA](navigation-polish.md) — final visual, responsive, accessibility and
    production-quality review.
22. [Card material refinement](card-material.md) — transparency, blur, reflections, boundaries,
    ambient shadows, Hero continuity, theme behavior, limitations and PR 26.2 guidance.

## How to use these documents

The words **must**, **should**, and **may** indicate requirement, recommendation, and permission.
When documents appear to conflict, use this priority:

1. Content legibility and accessibility.
2. Performance and platform resilience.
3. Surface and depth consistency.
4. Decorative expression.

No visual effect is required when it would violate a higher-priority rule. Future implementation PRs
must link to the relevant rule, use semantic tokens, and document any intentional exception.
