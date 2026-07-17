# Content

Portfolio copy is typed and kept separate from page templates. English and Spanish implement the
same `PortfolioSiteContent` structure, including identity, shell, navigation, footer, Home, future
page placeholders, Not Found and metadata. Stable IDs and paths remain locale-independent.

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

Internal links store a stable `pageId`, never a hand-built locale URL. `home-link.utils.ts` resolves
that ID for the active locale at the page boundary. External links require both an explicit `href`
and `external: true`.

## Data integrity

Content must come from an approved repository source. Do not invent companies, roles, dates,
metrics, publication status, email addresses or social URLs. Concepts must use the `concept` project
status and say that they are concepts in their descriptions. When source data is missing, keep the
typed empty state and a `TODO(content)` beside the owning collection.

The registry tests protect stable ID order, required counts, valid project statuses, localized link
targets, metadata completeness and the absence of placeholder domains.

### Add a selected project

1. Add one locale-independent ID to `PORTFOLIO_PROJECT_IDS`.
2. Add the same ID at the same position in both Home locale files.
3. Localize title, description, status label and link label while keeping the typed status stable.
4. Include technologies and URLs only when the repository provides a reliable source.
5. Run Portfolio content and section tests.

### Change featured content

Update `featuredContent.item` in both locale files, preserving its ID. Use a `pageId` for an internal
preview or an explicit external `href` only for an approved public publication. The Content page
owns the future full catalogue.
