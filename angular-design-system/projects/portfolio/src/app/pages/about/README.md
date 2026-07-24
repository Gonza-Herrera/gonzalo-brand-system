# About page

The localized About page explains Gonzalo Herrera's professional approach without duplicating a CV.
It connects frontend engineering, technical leadership and responsible AI adoption through a
qualitative, verifiable narrative. It is available at `/en/about` and `/es/about`.

## Editorial structure

`AboutPage` is a small standalone orchestrator. It reads the active locale Signal and composes:

1. About Hero — professional positioning and six focus areas.
2. Professional Story — three narrative paragraphs, four highlights and an Experience transition.
3. Engineering Philosophy — six principles presented through Feature Grid.
4. Leadership Approach — two short paragraphs and five practical leadership behaviors.
5. AI-Augmented Engineering — six defensible use cases and a human-judgment principle.
6. Core Principles — six stable decision-making principles.
7. Technical Focus — four contextual groups rendered as Cards and Tags.
8. Working Style — six collaboration practices.
9. Contact Callout — localized Contact and Experience actions.

App-private section components live under `sections/`. `AboutFeatureSectionComponent` intentionally
serves Philosophy, Core Principles and Working Style because those blocks share the same semantic
composition. Story, Leadership, AI and Technical Focus remain separate because they own distinct
content shapes or derived link behavior. There is no component per paragraph.

## Design System composition

About imports only the package root of `gh-design-system`. It reuses `gh-hero`, `gh-section-heading`,
`gh-feature-grid` and `gh-contact-callout`; the editorial compositions use `gh-container`,
`gh-stack`, `gh-grid`, `gh-cluster`, `gh-card` and `gh-tag`. The library was not changed for this
page.

Local SCSS owns only the Hero visual, reading width and small content spacing adjustments. Color,
spacing, radius, shadow, typography and surface values come from semantic `--gh-*` variables. The
page works with the existing light, dark and system theme contract.

## Content and localization

The readonly `PortfolioAboutContent` contract and stable ID constants live in
`content/models/about-content.model.ts`. English and Spanish copy live in
`content/en/about.content.ts` and `content/es/about.content.ts`; both use `satisfies` and are
registered by the locale-specific site content.

IDs describe meaning and never user-facing text. When changing philosophy, principles, leadership,
AI use cases, technical groups or working-style items:

1. Update the relevant stable ID tuple only when the concept itself changes.
2. Add the same ID at the same position in both locale files.
3. Localize titles and descriptions naturally rather than translating the ID.
4. Keep required values non-empty and avoid duplicates.
5. Run `npm run test:portfolio`.

Internal actions store a stable `pageId`. `portfolio-link.utils.ts` converts it to an active-locale
URL at the section boundary, so templates never concatenate `/en` or `/es` paths.

## Verifiable-content rules

About may describe approaches, principles and documented technical focus. Do not add years of
experience, employers, client names, team counts, outcomes, percentages, certifications, awards or
claims of expertise without an approved repository source. Technologies must be supported by the
repository and presented in context; do not add progress bars or rankings.

No approved portrait asset currently exists, so the Hero uses a secondary editorial composition.
Only add a portrait when the repository includes an approved, optimized asset and localized alt
text. Professional roles, dates and chronological detail belong to the future Experience page.

## Accessibility, responsive behavior and SSR

- `gh-hero` owns the page's only `h1`; section headings are `h2` and Card items are `h3`.
- Native links preserve keyboard behavior and visible global focus treatment.
- Concept and technology collections use semantic lists or Design System patterns.
- Reading copy uses `--gh-layout-reading-max`; Grid and Hero layouts collapse without viewport
  JavaScript or fixed content heights.
- All lists have deterministic tracking and content-defined order.
- The page contains no browser globals, observers, runtime IDs, random values or date-dependent
  output, so direct SSR and hydration are deterministic.

## Extending the page

Add a new block only when it answers a distinct editorial question. Define a readonly content
contract, add structurally equivalent EN/ES values, create a section component only when the block
has its own composition or derived logic, and compose public Design System APIs. Do not move an
About-specific section into the library without a demonstrated cross-product use case.

SEO beyond localized title and description, social metadata, analytics, CMS support and the full
Experience chronology remain out of scope.
