# Content

Portfolio copy is typed and kept separate from page templates. English and Spanish implement the
same `PortfolioSiteContent` structure, including identity, shell, navigation, footer, complete Home,
About, Experience, Projects and Content pages, typed Project/Content detail registries, localized Not
Found states and metadata. Stable IDs, slugs and paths remain locale-independent.

`portfolio-content.registry.ts` selects content by validated route locale. Compile-time contracts and
parity tests prevent either locale from drifting. There is no HTTP-loaded JSON, external translation
library, CMS, Markdown parser or backend.

## Home content

Home uses a dedicated `PortfolioHomeContent` contract because it is a complete composed page rather
than a placeholder. Copy lives in `en/home.content.ts` and `es/home.content.ts`; locale `site-content`
objects reference those modules. The contract covers:

- absolute page metadata;
- Hero copy, actions and professional-focus highlights;
- six expertise items;
- four selected-project previews and localized Card labels;
- an Experience preview capped at three items;
- one featured content item and localized type labels;
- the Contact Callout.

Internal links store a stable `pageId`, never a hand-built locale URL. `portfolio-link.utils.ts` resolves
that ID for the active locale at the page boundary. External links require both an explicit `href`
and `external: true`.

## About content

About has its own `PortfolioAboutContent` contract and locale modules at `en/about.content.ts` and
`es/about.content.ts`. It contains Hero, Professional Story, Engineering Philosophy, Leadership,
AI-Augmented Engineering, Core Principles, Technical Focus, Working Style and Contact content.

Every collection uses non-translatable IDs declared in `about-content.model.ts`. English and Spanish
must keep the same IDs, order, section structure, paragraph counts and action destinations. Translate
labels and explanations, never IDs. Content tests verify this parity, reject duplicate IDs,
percentages, empty technology names, placeholder domains and PR copy.

Technical focus is deliberately grouped by context. Add a technology only when an approved
repository source supports it, keep it in one group, and do not express proficiency as a percentage,
rank or unverified expertise claim. Professional history remains qualitative until companies, roles,
dates and outcomes have a verified source.

To change a principle or technical group:

1. Update the corresponding stable ID tuple only if the underlying concept changes.
2. Apply the same ID and position in both locale modules.
3. Keep the copy useful and equivalent rather than mechanically literal.
4. Update tests when the intentional contract changes.
5. Run `npm run test:portfolio`.

## Experience content

Experience has a dedicated `PortfolioExperienceContent` contract and localized modules at
`en/experience.content.ts` and `es/experience.content.ts`. It covers Hero, Career Summary,
Professional Timeline, Leadership Impact, Ways of Working, Capabilities, Career Direction and
Contact.

The canonical professional collections live in those Experience modules. Home never owns a second
history: it selects the first three records in source order and maps them to the same public Card
model. `experience-card.mapper.ts` and `selectFeaturedExperiences` are pure, preserve input order and
do not mutate records.

Experience IDs, Leadership IDs, Ways-of-Working IDs, Capability Group IDs and Career Direction IDs
must match between locales. Role titles, companies, dates, responsibilities, achievements and
technologies are translated or adapted only when a verified source supports them; IDs never change
with language.

- `id`, `role`, `company`, `startDate`, `summary` and non-empty `responsibilities` are mandatory for
  a professional record.
- `endDate`, `location`, work mode, achievements, technologies, current state, logo and
  confidentiality note are optional.
- Dates are preformatted editorial strings. Never parse, sort, calculate duration or derive current
  state from them.
- Set `current: true` explicitly and provide localized visible labels.
- Use only the public `remote`, `hybrid` and `onsite` work modes, and only when confirmed.
- Keep responsibilities specific to the role. Keep achievements optional, qualitative and
  verifiable; never invent metrics.
- Associate technologies with a role only when the source confirms them.
- For confidential work, omit protected names and use a truthful generic domain; never invent a
  client or product.

The current canonical collections are intentionally empty because the repository does not yet
contain an approved employer, role and date source. The localized verification notice is the real
empty state, not a fictional placeholder. See the [Experience page guide](../pages/experience/README.md).

## Projects content

Projects has a canonical localized registry in `en/projects.content.ts` and
`es/projects.content.ts`. `projects-content.model.ts` owns stable IDs, stable slugs, status and
category unions, optional verified links/images and the typed case-study structure. Both locale
collections contain the same four projects in the same editorial order.

Home does not maintain project preview records. It applies `selectFeaturedProjects` to each locale's
canonical registry, then uses the same `project-card.mapper.ts` as the Projects catalogue. The
mapper emits a localized Case Study link only when `caseStudy.available` is true. The current Home
preview therefore contains the Angular Design System and shares its exact status, description and
technology data with Projects.

Project IDs and slugs are:

- `angular-design-system`
- `ai-code-review-assistant`
- `angular-accelerator-kit`
- `ai-toolkit-for-developers`

Current statuses are `in-progress` for Angular Design System and `concept` for the other entries.
Current categories are `design-system`, `ai-engineering`, `angular` and `developer-tools`. Values
are locale-independent; labels are localized. Links must have a real approved destination, images
must reference an existing local asset with dimensions and localized alt text, and technologies
must be supported by the repository.

Only Angular Design System currently has `caseStudy.available: true`. Its EN/ES structure includes
Summary, Context, Problem, Goals, Constraints, Role, Approach, Architecture, Decisions,
Implementation, Challenges, Results, Lessons and Next Steps with stable nested IDs. Other project
routes render concise concept overviews without fabricated implementation detail. See the
[Projects guide](../pages/projects/README.md) and
[case-study guidelines](../../../../../docs/portfolio-case-studies.md).

## Data integrity

Content must come from an approved repository source. Do not invent companies, roles, dates,
metrics, publication status, email addresses or social URLs. Concepts must use the `concept` project
status and say that they are concepts in their descriptions. When source data is missing, keep the
typed empty state and a source note beside the owning collection.

The registry and page-specific tests protect stable ID/slug order, required counts, valid project
statuses and categories, localized link targets, case-study parity, metadata completeness and the
absence of placeholder domains.

## Content Hub registry

Content Hub summaries live in `en/content-hub.content.ts` and `es/content-hub.content.ts`. Stable
IDs, untranslated slugs, types, categories, status, tags, source, featured state, detail availability
and order remain structurally identical. Only `published` records enter the Hub, related-content
selectors or Home Featured Content.

Full internal bodies are split into `en/content-details.content.ts` and
`es/content-details.content.ts`. `content-details.registry.ts` is imported only by the lazy detail
page, so long editorial sections do not inflate the initial application bundle. The closed section
union includes text, list, callout, code and comparison; templates never use arbitrary HTML,
Markdown or `innerHTML`.

Current IDs/slugs are `angular-14-vs-angular-20`, `lessons-from-code-reviews`,
`building-ai-agents` and `signals-forms-vs-reactive-forms`. The first three are published internal
items with bilingual detail. Signal Forms vs Reactive Forms is intentionally `planned`, has no
detail and is excluded from production views.

`content-selectors.ts` handles published ordering, featured selection, category filters, slug lookup
and related content without mutation. `article-card.mapper.ts` maps the same registry records to
public Article Card and Content Highlight APIs while keeping localized routing in Portfolio. Home
selects its featured item from this canonical registry and holds the same object reference.

Published internal records require `detailAvailable: true` plus both locale details. Published
external records require a real approved HTTPS URL and do not get an internal route unless a detail
also exists. No external URLs, dates, reading times, images or metrics are currently included because
the repository does not substantiate them. Tests validate ID/slug uniqueness, closed values,
published destinations, detail and section parity, related IDs, featured selection, non-empty tags
and absence of placeholder URLs.

### Add a selected project

1. Add one locale-independent ID and slug to the stable tuples in `projects-content.model.ts`.
2. Add the same project at the same editorial position in both Projects locale files.
3. Localize title, description, status label, category label and case-study copy while keeping
   identity, status and category values stable.
4. Include technologies, URLs and images only when the repository provides a reliable source.
5. Set `featured: true` to derive the Home preview; never add a duplicate Home record.
6. Enable a Case Study only when its complete structure is defensible in both locales.
7. Run Portfolio content, selector, mapper, page, routing, metadata and SSR tests.

### Change featured content

Set `featured: true` on the selected published Content Hub record and keep other published records
false. Home uses `selectFeaturedContent` against each localized canonical registry; never add a
second preview object. Update the Hub's localized link label and copy only when the editorial action
changes.

See the [Content Hub page guide](../pages/content/README.md) and
[editorial guidelines](../../../../../docs/portfolio-content-guidelines.md) before adding or
publishing a record.
