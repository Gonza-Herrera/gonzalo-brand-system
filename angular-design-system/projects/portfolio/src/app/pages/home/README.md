# Portfolio Home

Home is the finished bilingual landing page for `/en` and `/es`. `HomePage` is intentionally a
small orchestrator: it selects the active locale content and passes it to six app-private sections.

```text
HomePage
├── HomeHeroComponent                    → gh-hero
├── HomeExpertiseSectionComponent        → gh-section-heading + gh-feature-grid
├── HomeSelectedProjectsSectionComponent → gh-section-heading + gh-project-card
├── HomeExperiencePreviewSectionComponent→ gh-section-heading + gh-experience-timeline
├── HomeFeaturedContentSectionComponent  → gh-section-heading + gh-content-highlight
└── HomeContactSectionComponent          → gh-contact-callout
```

The section components own mapping from Portfolio content to public Design System pattern inputs;
they do not own editorial copy. `portfolio-link.utils.ts` is the shared adapter for locale-aware internal
links and explicitly external URLs.

## Content and hierarchy

- `content/en/home.content.ts` and `content/es/home.content.ts` provide structurally equivalent,
  readonly content.
- Stable IDs identify highlights, expertise areas and projects across locales.
- Hero owns the page's only `h1`; section headings use `h2`; nested Project Cards and the Content
  Highlight use `h3`.
- Home derives featured projects from the canonical Projects registry. The Angular Design System is
  currently the only featured item, is labelled as work in progress and links to its localized Case
  Study. The remaining concepts stay available in the full Projects catalogue.
- No company, role or date source is approved yet. Experience therefore renders the public timeline
  with an empty collection and a localized verification notice instead of fabricated history.
- Featured content links to the localized internal Content preview until a verified publication URL
  exists.
- Contact exposes only the localized Contact route. Social and email actions remain absent until
  their URLs are verified.

## Responsive and theme behavior

Layout is CSS-only and inherits the Design System breakpoints, token surfaces and light/dark theme
mappings. The split Hero collapses through the public pattern, Feature Grid and Project Grid adapt
through their public responsive contracts, and every app-private style uses semantic `--gh-*`
tokens. No viewport JavaScript, timers or random output participate in SSR or hydration.

## Tests

`home.page.spec.ts` protects the integrated EN/ES composition, single `h1`, localized links and
reactive locale changes. `sections/home-sections.spec.ts` covers each section's public pattern,
heading hierarchy and honest empty states. `portfolio-link.utils.spec.ts` covers internal and external
link mapping.

## Editing Home

- To add or reorder expertise, use a stable ID in `PORTFOLIO_EXPERTISE_IDS`, then make the same
  ordered edit in both locale files. Keep the grid to six focused summary items.
- To add or change a selected project, update the canonical EN/ES Projects registries and set
  `featured: true`. Home applies `selectFeaturedProjects` and the shared Project Card mapper, so it
  must never own a duplicate record. Use a public `GhProjectStatus`, add only verified technologies
  and provide links only when their destinations are real.
- To change featured content, keep the same item ID across locales and select either a localized
  internal `pageId` or a verified explicit external URL. Never use a placeholder publication URL.
- To publish experience, add verified records to the canonical EN/ES Experience collections. Home
  derives at most three entries with `selectFeaturedExperiences`; never add a separate preview list.

## Accessibility and limits

All navigation uses native anchors with visible focus from the patterns or token-based local action
style. The Hero panel is semantic because its focus areas add useful context; it therefore has an
accessible label instead of `aria-hidden`. Status badges supplement visible status text, so meaning
does not depend on color. No image is used, so no unapproved portrait or missing alternative text is
introduced.

Home remains a strategic preview. The full Projects catalogue and Case Study now live under their
localized routes; Content, Contact, complete SEO, analytics and forms remain outside this page.
