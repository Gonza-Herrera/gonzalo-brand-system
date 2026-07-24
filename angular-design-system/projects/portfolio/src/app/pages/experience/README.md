# Portfolio Experience

Experience is the complete bilingual professional-positioning page for `/en/experience` and
`/es/experience`. Its Professional Experience section publishes Gonzalo Herrera's approved career
history while the surrounding sections explain engineering impact and ways of working.

## Editorial structure

`ExperiencePage` is a small standalone orchestrator. Long-form copy remains in the locale content
modules and each app-private section maps one editorial responsibility to public Design System APIs:

```text
ExperiencePage
├── ExperienceHeroComponent                   → gh-hero
├── ExperienceSummarySectionComponent         → Section + Stack + Cluster + Tag
├── ExperienceTimelineSectionComponent        → gh-experience-timeline + gh-experience-card
├── ExperienceFeatureSectionComponent         → gh-feature-grid (impact and ways of working)
├── ExperienceCapabilitiesSectionComponent    → Grid + Card + Cluster + Tag
├── ExperienceCareerDirectionSectionComponent → Section + Cluster + Tag
└── ExperienceContactSectionComponent         → gh-contact-callout
```

Stable section IDs are `career-summary`, `professional-experience`, `leadership-impact`,
`ways-of-working`, `capabilities`, `career-direction` and `contact`.

## Official source, model and order

The approved professional history is defined by the Professional Experience content brief and lives
in two canonical collections:

- `content/en/experience.content.ts` — English content.
- `content/es/experience.content.ts` — Spanish content.

`PortfolioProfessionalExperienceContent` is the single editorial model. It requires a stable ID,
explicit editorial order, company, role, preformatted dates, explicit current state, ordered
description paragraphs and responsibilities. Technologies and capabilities are separate optional
collections; at least one of them must be present for every record. Location, work mode, achievements,
authorized logo and confidentiality note remain optional.

The stable IDs and required order are:

1. `icbc-frontend-developer`
2. `endava-team-leader`
3. `vortex-frontend-developer`
4. `develative-frontend-developer`
5. `develative-project-manager`

`order` is an editorial integer and never comes from a parsed date. `selectOrderedExperiences`
returns a sorted copy without mutating the registry, and the public Timeline preserves that supplied
order. Dates are static localized content; no runtime duration or current date is calculated.

ICBC is the only record with `current: true`. The Card shows a visible localized status
(`Current`/`Actualidad`) in addition to its highlighted surface, so the state never depends on color.

## Description, responsibilities, technologies and capabilities

Each approved description is stored as an ordered paragraph array. The pure Card mapper preserves
those paragraphs, and `gh-experience-card` renders each value as a separate `<p>`.

Responsibilities remain an ordered semantic `<ul>` inside each Card. They are not converted to Tags
or hidden in tooltips. Technologies and capabilities use distinct labelled Tag groups:

- English: `Technologies` and `Capabilities`.
- Spanish: `Tecnologías` and `Capacidades`.

The distinction keeps Angular, TypeScript, Git and Azure DevOps separate from leadership,
mentoring, planning and stakeholder capabilities. No proficiency percentages, progress bars, logos
or unverified technologies are used.

## Mapper and selectors

`content/utils/experience-card.mapper.ts` is the only adapter between Portfolio content and
`GhExperienceCardData`. It is pure, does not mutate input and maps identity, company, role, period,
current state, paragraphs, responsibilities, achievements, technologies and capabilities.

`content/utils/experience-selectors.ts` owns three deterministic selectors:

- `selectOrderedExperiences` — stable ascending editorial order.
- `selectCurrentExperience` — the explicitly current record or `undefined`.
- `selectExperiencePreview` — the first `limit` ordered records, defaulting to three.

The full page maps all five ordered records. Home uses `selectExperiencePreview` against the same
localized collection and maps concise Cards containing the same ID, company, role, period and
current state. Home never owns a second employment registry.

## English and Spanish parity

IDs, order, roles, current state, collection sizes, optional-field presence and non-translatable
technology values remain aligned between languages. `ICBC Bank`/`Banco ICBC`, periods,
descriptions, responsibilities and capabilities use approved localized copy. Tests validate:

- exactly five unique records in both locales;
- identical IDs and order;
- one current record, always ICBC;
- equivalent paragraph, responsibility, technology and capability counts;
- non-empty required fields;
- no provisional source notices, placeholder URLs or unapproved metrics;
- a three-record Home preview consistent with the canonical page source.

## Add or update an experience

1. Confirm every company, role, date, responsibility, technology and capability against an approved
   source. Do not infer or enrich missing facts.
2. Add a stable, non-translated ID to `PORTFOLIO_PROFESSIONAL_EXPERIENCE_IDS`.
3. Add structurally equivalent records to both locale collections.
4. Assign an explicit unique `order`; do not sort by date strings.
5. Store every description paragraph separately in `summary`.
6. Keep responsibilities role-specific and as complete sentences.
7. Place implementation tools under `technologies` and ways of leading or collaborating under
   `capabilities`.
8. Set `current: true` only for the active role and set every other record to `false`.
9. Update content, selector, mapper, page, Home integration and metadata tests.
10. Run the Portfolio, Design System and Showcase tests plus all required builds.

To update an existing role, keep its stable ID unless the identity of the experience genuinely
changes. To mark a different role as current, update both locales in the same change and ensure
exactly one record remains current.

Never add clients, product names, users, team sizes, percentages, commercial outcomes, awards,
certifications, external URLs or technologies without an approved source. For confidential work,
omit protected facts rather than replacing them with invented detail.

## Accessibility, responsive behavior and SSR

Hero owns the only `h1`; sections use `h2`; Timeline roles use `h3`. The Timeline owns one semantic
`ol`; responsibilities and contributions use `ul`; technology and capability Tags wrap without
horizontal scrolling. Periods and current state are visible text, and DOM order matches visual order.

Layout is CSS-only and uses semantic `--gh-*` tokens. Cards have no fixed height, copy preserves a
comfortable reading measure and the Timeline remains a single column from 320px through desktop.
The same semantic surfaces support light, dark and system themes. Motion is not required to
understand the chronology, and global foundations respect reduced-motion preferences.

The page and selectors are deterministic. They do not use `window`, `document`, storage, `Date`,
random values or client-dependent sorting, so direct SSR and hydration for `/en/experience` and
`/es/experience` produce the same structure as the client.

Advanced SEO, analytics, deployment, external company links and employer imagery remain outside
this content update.
