# Portfolio case-study guidelines

Portfolio case studies explain verified engineering work in enough detail for a reader to understand
the problem, decisions, implementation and present result. They are not marketing pages, resumés,
project-management records or containers for speculative metrics.

## Editorial structure

A complete case study contains:

1. Project identity, stable slug, category, status and short description.
2. Summary facts: type, role and focus when those values are supported.
3. Context and problem.
4. Goals and constraints.
5. Role, responsibilities and an optional transparent AI-collaboration note.
6. Approach and accessible architecture representation.
7. Technical decisions with context, decision, rationale and optional trade-offs.
8. Implementation phases.
9. Challenges and the response to each challenge.
10. Qualitative or evidence-backed results.
11. Lessons learned and real next steps.

The discriminated `caseStudy.available` field controls whether Project Card exposes the localized
detail link. A project may remain in the catalogue with `available: false`; its manual detail route
then shows a concise overview and one availability explanation rather than empty sections.

## Required and optional fields

Project ID, slug, title, short description, status, localized status label, category, localized
category label, technologies array, featured state, editorial order and case-study availability are
required. Technologies may be an empty array when none are verified.

For an available case study, every top-level editorial section is required so both locales maintain
the same narrative architecture. Descriptions, paragraph collections, trade-offs, capabilities,
links and images are optional where the model allows them. Templates still guard optional content
and never render empty lists or headings.

## Verifiable-content rules

- Use repository documentation, code, generated artifacts and other approved sources.
- Never invent clients, users, repositories, URLs, dates, architectures, roles, integrations or
  deployment status.
- Distinguish a concept, in-progress project and completed result explicitly.
- Do not describe a prototype or repository foundation as a published product.
- Keep AI assistance transparent where relevant, and keep human technical review explicit.
- Omit unsupported fields instead of inserting “TBD”, repeated “Coming soon” text or plausible copy.

Metrics require a named, reviewable source and a clear measurement definition. Do not publish
percentages, delivery speed, defect reduction, traffic, user counts, revenue or performance claims
based on inference. Qualitative outputs such as an existing reusable library or documented catalogue
are acceptable when those artifacts exist.

For confidential work, use the approved employer name when permitted and describe the problem domain
generically. Never replace a protected client or product with a fictional one. Omit screenshots,
logos, architecture details or links that could expose private information.

## Images and captures

Case studies work without images. When an approved visual adds real explanatory value:

1. Store an optimized, stable asset under the Portfolio public directory.
2. Remove credentials, private repositories, client data and personal information.
3. Provide localized alternative text plus intrinsic width and height.
4. Lazy-load non-critical images and verify light/dark surroundings.
5. Add an asset-existence test.

Do not use unstable external image URLs, fabricated product screens or unapproved logos.

## Technical decisions

A decision entry must explain its context, the choice, why it fits and relevant trade-offs. “Used
Angular” is not a decision. Prefer boundaries readers can evaluate, such as generated tokens as the
source of truth, standalone components, composition over inheritance or keeping routing outside the
library. Include only decisions implemented by the project.

## Add a case study

1. Create or confirm a stable lowercase kebab-case slug. Slugs do not change with locale.
2. Add structurally equivalent content to both locale project registries.
3. Preserve the same section, decision, phase, challenge and result IDs and order.
4. Set `available: true` only after both versions are complete and reviewable.
5. Let the existing mapper generate `/en/projects/:slug` and `/es/projects/:slug`; never concatenate
   routes in templates.
6. Keep related-project selection data-driven through category and technologies. Do not hardcode or
   randomize recommendations.
7. Metadata uses the localized short description and project title automatically. Review both
   locales and the invalid-slug metadata.
8. Add content, page, selector, route, locale-switching and SSR tests.

If copy cannot be supported in one language, do not silently fall back to the other. Keep
`available: false` in both locales until parity is restored.

## SEO boundary

PR 15 owns localized titles and basic description metadata. Canonical URLs, document-level
`hreflang`, complete Open Graph, social images, JSON-LD, sitemap and production-domain configuration
belong to PR 18.
