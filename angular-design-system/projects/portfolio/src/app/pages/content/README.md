# Content Hub

The Content Hub is the public bilingual catalogue for Gonzalo Herrera's engineering articles and
guides. It is intentionally a typed static product surface, not a CMS or blog engine.

## Routes

| Purpose                    | English             | Spanish             |
| -------------------------- | ------------------- | ------------------- |
| Hub                        | `/en/content`       | `/es/content`       |
| Internal detail            | `/en/content/:slug` | `/es/content/:slug` |
| Unknown/unavailable detail | same route shape    | same route shape    |

Slugs are stable and untranslated. The URL owns locale and content identity, so the global Language
Switcher preserves a detail slug when switching between English and Spanish.

## Architecture

```text
Localized Content Hub registry
    ↓ published/featured/filter selectors
Hub Hero, Content Highlight and Article Card grid
    ↓ stable localized content path
Lazy Content Detail chunk
    ↓ locale-specific typed detail registry
Editorial sections, Related Content and Contact Callout
```

`en/content-hub.content.ts` and `es/content-hub.content.ts` contain lightweight catalogue records.
The larger bodies live in `content-details.content.ts` and are imported only by the lazy detail page;
this keeps the initial Portfolio bundle within budget. `content-details.registry.ts` selects a body
from the active locale without HTTP, Observables or browser APIs.

The Hub uses local Signals for `activeFilter`, published records, the featured item and derived Card
views. `content-selectors.ts` owns deterministic order, filtering, slug resolution and related
content. `article-card.mapper.ts` is the only adapter to the public Article Card and Content
Highlight models. Neither reusable Design System component knows about Portfolio routes or locale.

## Content contract

Stable IDs and slugs currently are:

- `angular-14-vs-angular-20` — published internal article.
- `lessons-from-code-reviews` — published internal article.
- `building-ai-agents` — published internal guide and the single featured item.
- `signals-forms-vs-reactive-forms` — planned and intentionally excluded from production views.

Closed content types are article, LinkedIn post, guide, resource, talk and case study. Closed
categories cover Angular, frontend engineering, technical leadership, AI engineering, software
architecture, developer experience and career. Status is `published`, `draft`, `planned` or
`archived`; only `published` records enter Hub, Home or related-content selectors.

An internal published item requires `detailAvailable: true` and a complete EN/ES detail. An external
published item requires an approved HTTPS URL and never receives an empty internal route. The current
registry contains no external item because the repository has no verified publication URL.

## Filters and empty state

The UI exposes only categories containing published content: All, Angular, Technical Leadership and
AI Engineering. Buttons are native, wrap responsively, expose `aria-pressed` and retain visible
focus. Filter state is local and resets on reload. The localized empty state remains defensive for
future registry changes and its action resets to All.

## Internal details

The detail renderer accepts a closed union of text, list, callout, code and comparison sections. It
uses explicit Angular control flow, never `innerHTML` or a Markdown parser. Code is escaped inside
`pre > code`; wide code and tables scroll within their own containers. Comparison tables use a
caption, column headers and row headers. Optional introduction, metadata, takeaways and related
content render only when present.

Related content first respects explicit, validated IDs from the detail and then applies deterministic
category/tag overlap. It excludes the current item and every unpublished or unavailable record.

## Add content

1. Add one stable ID/slug to `PORTFOLIO_CONTENT_IDS`.
2. Add the same summary record and structural values to both Hub locale modules.
3. Keep new work non-published until title, excerpt, tags, source and bilingual destination are real.
4. For external content, set `source.type: 'external'`, an approved platform and the exact HTTPS URL;
   keep `detailAvailable: false` unless a complete internal detail also exists.
5. For internal content, add the same detail key to both detail registries, preserve section IDs and
   types, then set `detailAvailable: true`.
6. Use only authored dates, reading time and image assets. Include an ISO date plus localized label,
   and intrinsic image dimensions when those fields exist.
7. Set exactly the editorially selected published item to `featured: true`; Home derives its
   Featured Content from the same selector and object.
8. Add optional related IDs only when the target exists in both locales.
9. Run Portfolio content, selector, mapper, page, route, metadata, SSR and parity tests.

To add a code block, store escaped source text with a language label and optional caption. To add a
comparison, provide stable column and row IDs plus one cell per column. Never store arbitrary HTML.

## Accessibility, responsive and SSR

The Hub and every detail have one `h1`; section/Card headings follow `h2`/`h3`. Native links own
navigation, external links receive safe attributes through public components, tags wrap, and all
controls remain usable with keyboard and 200% zoom. The Hub spans one mobile column and responsive
multi-column grids; detail copy uses the public reading measure. No viewport/browser API, runtime
date, random order or generated ID affects server output, so hydration remains deterministic.

## Current limits

There are no verified external URLs, publication dates, reading times, editorial images, metrics or
downloadable resources in the approved source data. Those values are omitted. Search, pagination,
CMS, Markdown, RSS, comments, subscriptions, analytics and advanced SEO remain out of scope. PR 17
owns the final Contact experience; PR 18 owns canonical, hreflang, Open Graph and structured data.
