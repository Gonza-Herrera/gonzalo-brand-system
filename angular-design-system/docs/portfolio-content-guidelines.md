# Portfolio content guidelines

## Editorial purpose

Portfolio Content should help engineers and technical leaders build, review and evolve software with
more clarity. Primary themes are Angular, frontend engineering, technical leadership, software
architecture, code review, AI-augmented development, developer experience, design systems and career
mentoring. The voice is professional, accurate, calm, practical and human. Avoid clickbait, fear,
generic motivation and AI hype.

## Titles and excerpts

- Make a specific promise that the body can fulfill.
- Prefer clear technical language over novelty claims.
- Keep the same stable ID and untranslated slug in English and Spanish.
- Localize meaning rather than translating mechanically.
- Summarize the real scope in the excerpt; do not imply research, benchmarks or outcomes that are
  not present.

## Categories, formats and tags

Choose one primary category from the closed model. Use the format that matches the destination:
article for narrative analysis, guide for an actionable sequence, resource for a reusable reference,
LinkedIn post for a verified social publication, talk for a verified event recording or page, and
case study for documented work. Tags should be short, useful for discovery, supported by the body and
non-empty. Do not use tags as unverified expertise claims.

## Publication status

`published` is a product promise: a reader must reach a complete internal detail or a real external
source. `draft`, `planned` and `archived` remain absent from production selectors. Use `planned` only
for an intentional editorial topic; it is not a placeholder announcement. Mark an item featured only
when it is published, and keep the editorial order explicit.

## Dates, reading time and metrics

Use an ISO date and localized label only when the publication date is verified. Never render relative
dates or derive a date at runtime. Reading time may be calculated once for a complete internal body
and saved as editorial data; do not estimate it during rendering. Reader counts, reactions,
impressions, performance gains and other metrics require a named reviewable source and measurement
definition. Otherwise omit them.

## Internal or external

Choose internal content when the repository owns a complete, maintainable EN/ES body. Choose external
content when the authoritative publication already exists at an approved HTTPS URL. External Cards
open that source safely and do not receive an empty detail route. Never use example domains, search
results or inferred LinkedIn URLs. A manual internal request for unavailable content stays inside the
Portfolio shell and renders Content Not Found; SSR never redirects a reader to an external site.

## Technical bodies

Use the smallest typed section set that communicates the material. Paragraphs belong in text
sections; steps and checks use semantic lists; complementary principles may use a callout. Code must
be relevant, reviewable, escaped and presented as text with a language label—never executed or passed
through `innerHTML`. Use a comparison table only for genuinely tabular relationships, with a caption,
column headers and row headers. Do not add an external syntax highlighter or arbitrary HTML.

References must point to a real approved source and describe what it supports. Do not invent authors,
events, talks, resources or publication histories. Images require an approved local asset, localized
alt, intrinsic dimensions and privacy review.

## Bilingual parity

Every published internal item must exist completely in English and Spanish before release. IDs,
slugs, types, categories, statuses, section IDs/types and related IDs must match. Visible copy, labels,
tags and date labels are localized. If one language is incomplete, keep the item unpublished in both;
never silently fall back to the other language.

## Verification checklist

Before changing status to published:

1. Confirm the title, claims and technical guidance against approved repository sources.
2. Confirm a complete internal detail in both locales or the exact real external URL.
3. Validate non-empty excerpt and tags, stable order and unique ID/slug.
4. Confirm optional date, reading time, image, reference and metric data independently.
5. Review code and tables for accuracy, safety, semantics and overflow.
6. Review related IDs and featured selection.
7. Run content integrity, routing, metadata, SSR and page tests.

Do not publish confidential work, personal information, private screenshots, fictional examples
presented as real work, generated metrics, unverified URLs or incomplete drafts.
