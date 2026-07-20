# Portfolio Experience

Experience is the complete bilingual professional-positioning page for `/en/experience` and
`/es/experience`. It explains Gonzalo Herrera's career direction, engineering impact and ways of
working without inventing employment history that is not present in an approved repository source.

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

## Content source and model

`PortfolioExperienceContent` owns Hero, Career Summary, Timeline, Leadership Impact, Ways of
Working, Capabilities, Career Direction and Contact. English lives in
`content/en/experience.content.ts`; Spanish lives in `content/es/experience.content.ts`. Stable IDs
are locale-independent and content tests require the same IDs and order in both languages.

`PortfolioProfessionalExperienceContent` is the editorial record. It requires a stable ID, role,
company, preformatted start date, summary and responsibilities. End date, location, work mode,
achievements, technologies, current state, authorized logo and confidentiality note are optional.
The public Design System model is not duplicated: work modes reuse `GhExperienceWorkMode` and the
pure `experience-card.mapper.ts` adapts editorial records to `GhExperienceCardData`.

The repository currently has no approved employer, role or date source. Both canonical experience
collections therefore remain empty and the page renders a localized verification notice. No
companies, dates, responsibilities, achievements, technologies, logos or current-role state have
been invented. The qualitative sections are supported by the repository's brand positioning,
technical architecture and existing About content.

## Timeline and Home preview

The full page passes consumer order directly to `gh-experience-timeline`; neither the mapper nor the
component parses, sorts or calculates dates. The pattern owns the semantic ordered list and composes
`gh-experience-card`, so Portfolio does not duplicate either visual.

Card labels are localized through `GhExperienceCardLabels`. Role headings use `h3` below the
Timeline section's `h2`; responsibilities and selected contributions remain distinct semantic
lists. `current: true` is explicit and accompanied by localized visible text.

Home imports the same localized Experience collection, applies
`selectFeaturedExperiences(items, 3)`, then uses the same pure mapper. This preserves IDs and source
order without maintaining a second professional-history list.

## Add or modify an experience

1. Confirm that company, role, dates and every role-specific statement exist in an approved source.
2. Add one stable, non-translated ID to both locale collections at the same position, newest first.
3. Provide localized, preformatted `startDate` and optional `endDate`; never use `Date`, parse dates
   or calculate tenure.
4. Add three to six specific responsibilities. Do not copy the same generic list across roles.
5. Add achievements only when verifiable. Omit the field instead of relabeling responsibilities or
   inventing percentages.
6. Add only technologies confirmed for that role. Do not copy a global stack into every entry.
7. Set `current: true` manually for the active role. Do not infer it from a missing end date.
8. Use only `remote`, `hybrid` or `onsite`, and only when work mode is confirmed.
9. For confidential work, keep the real employer when permitted, describe the domain generically
   and add no fictitious client or product name.
10. Run Portfolio content, mapper, section and routing tests.

To add a company logo, place an authorized, stable asset under `projects/portfolio/public`, provide
meaningful alternative text when informative, and verify that the Card still works without it.
External logo services are not allowed.

## Accessibility, responsive behavior and SSR

Hero owns the only `h1`; sections use `h2`; timeline roles use `h3`. The timeline owns one semantic
`ol`, responsibilities and contributions use separate `ul` elements, technologies and capabilities
wrap without horizontal scrolling, and actions are native links with the existing focus treatment.
Current state and work mode always include visible text rather than relying on color.

Layout is CSS-only and uses semantic `--gh-*` tokens. The split Hero and grids collapse naturally at
mobile sizes, Cards have no fixed height, and reading copy keeps the shared maximum measure. Theme
surfaces work with light, dark and system modes, including reduced-motion foundations.

The page uses Signals and pure deterministic transforms. It has no `window`, `document`, storage,
observers, `Date`, random IDs or client-dependent ordering, so direct SSR and hydration for both
localized routes remain stable.

## Limits and next milestone

Employment records remain the one intentional content gap until an approved CV or equivalent source
is added. Projects and the first Case Study now use the same typed, locale-aware content boundary;
advanced SEO, analytics and contact behavior remain outside this page. PR 16 should implement the
Content Hub without duplicating Experience data.
