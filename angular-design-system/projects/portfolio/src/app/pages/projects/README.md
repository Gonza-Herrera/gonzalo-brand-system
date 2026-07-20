# Portfolio Projects and Case Studies

Projects is the bilingual catalogue and case-study surface for `/en/projects` and `/es/projects`.
It presents only repository-supported project information, exposes one complete case study for the
Angular Design System and labels the other entries as concepts without implying implementation,
publication or measurable outcomes.

## Routes

| Content                  | English                                 | Spanish                                 |
| ------------------------ | --------------------------------------- | --------------------------------------- |
| Catalogue                | `/en/projects`                          | `/es/projects`                          |
| Angular Design System    | `/en/projects/angular-design-system`    | `/es/projects/angular-design-system`    |
| Concept overview example | `/en/projects/ai-code-review-assistant` | `/es/projects/ai-code-review-assistant` |
| Invalid slug             | `/en/projects/unknown-project`          | `/es/projects/unknown-project`          |

Slugs are locale-independent. The Language Switcher replaces only the locale segment, so a detail
route keeps the same slug in the other language. A valid concept slug renders a concise, honest
overview; an unknown slug renders explicit localized Project Not Found content without redirecting.

## Architecture

```text
Localized project registry
    ↓
Pure selectors and Project Card mapper
    ↓
Projects catalogue ──→ Home featured preview
    ↓
Localized /projects/:slug route
    ↓
Typed detail resolution
    ↓
Case Study or concept overview
    ↓
Related Projects and Contact
```

`ProjectsPage` composes the public Hero, Section Heading, Project Card, Contact Callout and Layout
Primitives. `ProjectDetailPage` is lazy loaded and explicitly renders the available typed sections;
it is not a dynamic CMS renderer. `ProjectTextSectionComponent` exists only because the same
text/list structure is reused across Context, Problem, Goals, Constraints, Lessons and Next Steps.

Portfolio imports the Design System only through `gh-design-system`. The only public-library change
for this page is a backwards-compatible set of optional Project Card fields: a visible category,
intrinsic image dimensions and explicit external-link flags that add safe new-tab attributes when
needed. Routing, locale state, metadata and editorial models remain application concerns.

## Registry and models

`content/models/projects-content.model.ts` owns stable project IDs, slugs, statuses, categories,
link/image contracts and the case-study structure. English and Spanish registries live in
`content/en/projects.content.ts` and `content/es/projects.content.ts`.

Current stable IDs and slugs are:

- `angular-design-system`
- `ai-code-review-assistant`
- `angular-accelerator-kit`
- `ai-toolkit-for-developers`

Statuses reuse the public `GhProjectStatus` contract. The current evidence supports `in-progress`
for Angular Design System and `concept` for the other entries. Categories are `design-system`,
`angular`, `ai-engineering` and `developer-tools`; IDs, slugs, status values and category values are
never translated.

`selectProjectsInEditorialOrder` sorts a copy by the authored `order`. `selectFeaturedProjects`
derives Home content, and `selectRelatedProjects` first ranks category/technology overlap before
filling the requested deterministic limit. No selector mutates input or uses dates, randomness or
browser state.

`mapProjectToCard` adapts editorial content to `GhProjectCardData`. It maps the visible category,
status, technologies and optional media. A localized project URL is emitted only when
`caseStudy.available` is true. Repository links are emitted only when a verified repository link is
present in the registry.

## Home integration

Home does not own project previews. Each locale applies `selectFeaturedProjects` to the canonical
localized collection and passes those same object references through the shared Project Card mapper.
The Angular Design System is currently the only featured item. Changing its status, description or
technology list in the registry therefore changes Home and Projects together.

## Filters

No filters are implemented. Four projects remain easy to scan, and adding local filter state would
not currently improve discovery enough to justify the extra control and tests. Reconsider filters
when the catalogue grows; use native buttons, a Signal, visible selected state and `aria-pressed`.

## Add or update a project

1. Add a stable, non-translated ID and slug to the model tuples.
2. Add the project at the same editorial position in both locale registries.
3. Use an evidence-based status and category; do not infer completion from an initial implementation.
4. Add only technologies and capabilities supported by an approved source.
5. Set `featured: true` only when the item should appear on Home; the Card also displays that state.
6. Add a link only when its real destination is approved. Never add placeholder domains.
7. Add an image only when the optimized local asset exists and has localized alt text plus intrinsic
   dimensions. The Card must continue to work without it.
8. Keep `caseStudy.available: false` until a defensible narrative exists in both languages.
9. Run content, selector, mapper, page, route, metadata and SSR tests.

To add a category, extend `PORTFOLIO_PROJECT_CATEGORIES`, localize the visible `categoryLabel` in
both registries and update validation tests. Do not derive IDs or slugs from translated titles.

## Enable a case study

Change the discriminated `caseStudy` union to `available: true` and provide Summary, Context,
Problem, Goals, Constraints, Role, Approach, Architecture, Decisions, Implementation, Challenges,
Results, Lessons and Next Steps in both locale files. Use stable nested IDs and omit unsupported
claims instead of filling the structure with placeholders. See
[`docs/portfolio-case-studies.md`](../../../../../../docs/portfolio-case-studies.md).

## Accessibility, responsive behavior and SSR

Hero owns the only `h1`; page sections use `h2`; facts, decisions, phases, challenges, results and
Project Cards use `h3` or `h4` according to their nesting. Navigation is made of native links, Card
state includes visible text, lists preserve native semantics and no interaction depends on color.

Token-driven CSS collapses Hero, facts, diagrams and grids to one column on small screens. Content
has no fixed height, images are optional and Tags wrap. The pages use Signals and pure deterministic
transforms with no direct browser globals, dynamic dates, runtime IDs or random ordering. Direct EN
and ES routes therefore produce the same initial content during SSR and hydration.

## Current limits and next PR

Only Angular Design System has a complete case study. No external project URL, screenshot, client,
metric or date is published because the approved content source does not provide one. Filters,
previous/next controls and dynamic project imports are intentionally deferred until catalogue size
or content volume justifies them.

PR 16 should implement the Content Hub without moving Portfolio-specific case-study sections into
the Design System or introducing a CMS.
