# Portfolio performance and accessibility audit

This document records the PR 19 audit of the bilingual Angular Portfolio. It is an engineering
baseline, not a claim of complete WCAG conformance or production Core Web Vitals.

## Scope and method

The work followed this sequence:

```text
Audit → Measure → Identify → Prioritize → Correct → Remeasure → Document
```

The audited surface included the Angular production build, initial and lazy chunks, SSR output,
hydrated client navigation, Home, Contact, the Spanish Home, the shared Design System patterns,
keyboard focus, themes, localization, the Contact form and console/build output.

Tools and context:

- Angular CLI 21 production builds with `--stats-json`.
- Lighthouse 12.8.2 against the local production SSR server.
- Lighthouse mobile defaults and desktop preset, with Chrome headless and no extensions.
- In-app browser inspection at 1280 px for the hydrated application.
- Vitest through the Angular test builder.
- The repository SSR/SEO validator and direct local HTTP timing.

Lighthouse numbers are laboratory results from this machine. Network, CPU scheduling and the local
SSR process introduce variance. They are not Chrome UX Report data and do not establish field LCP,
CLS or INP.

## Baseline

The initial production browser bundle was 547.83 kB raw and 130.35 kB estimated transfer. The
largest application-controlled initial chunk was 216.90 kB and included the Design System together
with complete English and Spanish page registries. Consequently, visiting Home downloaded About,
Experience, Projects and Content summaries that the current route did not render.

Baseline Lighthouse used one run per route and profile:

| Route and profile     | Performance | Accessibility | Best Practices | SEO |      LCP |   TBT | CLS |   Payload |
| --------------------- | ----------: | ------------: | -------------: | --: | -------: | ----: | --: | --------: |
| `/en` mobile          |          71 |            96 |            100 | 100 | 4,808 ms |  8 ms |   0 | 692,182 B |
| `/en/contact` mobile  |          75 |           100 |            100 | 100 | 4,354 ms | 42 ms |   0 | 735,057 B |
| `/es` mobile          |          71 |            96 |            100 | 100 | 4,804 ms |  8 ms |   0 | 692,650 B |
| `/en` desktop         |          97 |            96 |            100 | 100 | 1,041 ms |  0 ms |   0 | 692,182 B |
| `/en/contact` desktop |          98 |           100 |            100 | 100 |   883 ms |  0 ms |   0 | 735,057 B |
| `/es` desktop         |          97 |            96 |            100 | 100 |   986 ms |  0 ms |   0 | 692,650 B |

The Home LCP element was the text `h1`, not an image. No page image or web font request occurred.
The only Portfolio image asset is the social sharing image, which is referenced by metadata and is
not part of page rendering.

## Findings and priority

No critical or high-severity issue was found in the audited local build.

| Priority | Finding                                                                          | Evidence                            | Resolution                                                             |
| -------- | -------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------- |
| Medium   | Complete bilingual page registries were initial code                             | 216.90 kB shared initial chunk      | Split shell metadata and route content; resolve detail metadata lazily |
| Medium   | Home loaded complete Experience, Projects and Content models                     | Bundle module graph                 | Add typed Home previews and keep full collections with their routes    |
| Medium   | Two dark/system Home text combinations missed AA                                 | Lighthouse ratios 3.96:1 and 3.85:1 | Use solid accent and semantic secondary-text tokens                    |
| Medium   | Invalid Contact submit left focus on the button                                  | Hydrated browser test               | Focus the first invalid native control                                 |
| Low      | Language and external-link accessible names did not contain their visible labels | Lighthouse label-in-name audit      | Compose accessible names from visible and descriptive labels           |
| Low      | Several persistent navigation targets were smaller than 44 px                    | Browser geometry                    | Apply a 44 px minimum interactive target                               |
| Low      | Horizontal clipping could mask a layout defect                                   | Static CSS audit                    | Remove `overflow-x: clip`; verify no horizontal overflow               |

## Changes

### Loading and bundles

- `PortfolioLocaleService` now reads a small localized shell registry instead of complete site
  content.
- Page components use route-specific localized registries.
- Project and Content detail routes resolve their collection only when that detail route activates;
  the title strategy consumes resolved content for specific metadata.
- Home owns small, typed preview records. The complete Experience, Projects and Content collections
  remain in their lazy route chunks.
- Page metadata is centralized independently of editorial bodies.
- No dependency, preloading strategy, Service Worker or speculative `@defer` block was added.
- Existing standalone lazy routes and `OnPush` change detection were preserved.

Final browser build:

| Asset group                      |       Raw | Estimated transfer |
| -------------------------------- | --------: | -----------------: |
| Initial total                    | 452.91 kB |          111.46 kB |
| Angular runtime chunk            | 172.24 kB |           51.20 kB |
| Shared Design System/shell chunk | 117.58 kB |           17.99 kB |
| Main                             | 111.14 kB |           28.35 kB |
| Styles                           |  21.06 kB |            2.65 kB |
| Contact lazy route               |  72.11 kB |           15.86 kB |
| Experience lazy route            |  37.61 kB |            8.50 kB |
| About lazy route                 |  35.09 kB |            7.96 kB |
| Home lazy route                  |  18.17 kB |            4.11 kB |

The initial raw bundle decreased by 94.92 kB, or 17.3%. Estimated initial transfer decreased by
18.89 kB. The Portfolio initial budget changed from a 550 kB warning and 1 MB error to a 500 kB
warning and 550 kB error. Component-style budgets remain 10 kB warning and 12 kB error.

### Accessibility

- Native landmarks, one `main`, one page `h1`, heading order and the existing skip link were kept.
- Client locale navigation was verified to focus `#main-content` after a successful route change.
- Navigation, footer, language and theme controls now meet a 44 px minimum target in the inspected
  desktop layout.
- Language links retain visible `EN`/`ES` text and expose names such as `ES — Spanish`.
- External Feature Grid actions include the visible action text in their accessible name while
  retaining descriptive new-tab context.
- The LinkedIn link remains a native anchor with visible text, `target="_blank"` and
  `rel="noopener noreferrer"`.
- Empty Contact submit marks all invalid controls, links each error with `aria-describedby`,
  announces the validation summary and focuses the first invalid field.
- Existing loading, success, error, honeypot and duplicate-submit tests remain in place. No real
  Web3Forms request was sent during the audit.
- The two detected contrast failures were corrected with semantic Design System tokens in both
  themes.
- Existing `prefers-reduced-motion` handling remains active; motion does not carry essential
  meaning.

Automated tools found no accessibility, Best Practices, SEO or console error in the final
representative Lighthouse runs. Automated checks cannot validate every WCAG success criterion or
replace assistive-technology testing.

## Remeasurement

The first controlled post-change run, using the same single-run method as the baseline, produced:

| Route and profile     | Performance | Accessibility |      LCP |   TBT | CLS |   Payload |
| --------------------- | ----------: | ------------: | -------: | ----: | --: | --------: |
| `/en` mobile          |          82 |           100 | 4,059 ms | 50 ms |   0 | 610,414 B |
| `/en/contact` mobile  |          79 |           100 | 3,908 ms | 37 ms |   0 | 641,648 B |
| `/es` mobile          |          74 |           100 | 4,573 ms |  7 ms |   0 | 610,882 B |
| `/en` desktop         |          98 |           100 |   903 ms |  0 ms |   0 | 610,414 B |
| `/en/contact` desktop |          97 |           100 | 1,077 ms |  0 ms |   0 | 641,648 B |
| `/es` desktop         |          99 |           100 |   845 ms |  0 ms |   0 | 610,882 B |

Best Practices and SEO remained 100 in all rows. The Contact desktop score moved from 98 to 97 in
that run despite a smaller payload and zero blocking time, illustrating normal lab variance.

After the final Contact focus fix, the exact final build was rerun three times on mobile. Median
Home was Performance 75, Accessibility 100, LCP 4,319 ms, TBT 61 ms and CLS 0. Median Contact was
Performance 73, Accessibility 100, LCP 4,715 ms, TBT 5 ms and CLS 0. Exact-build desktop
confirmation was 99/100/100/100 for Home and 97/100/100/100 for Contact. The final payload was
610,350 B for Home and 642,437 B for Contact.

The bundle and payload reductions are deterministic. Mobile Lighthouse Performance and LCP were not
stable enough to claim a production Core Web Vitals improvement, and the mobile lab LCP remains
above the 2.5-second “good” threshold. CLS remained 0. TBT stayed low, but TBT is not field INP.

Warm local SSR response timing after the final build:

| Route         | Status |    TTFB |   Total |
| ------------- | -----: | ------: | ------: |
| `/en`         |    200 | 10.0 ms | 14.5 ms |
| `/en/contact` |    200 | 10.5 ms | 13.8 ms |
| `/es`         |    200 |  8.4 ms | 11.9 ms |

These local timings do not predict production network latency.

## Images, fonts, SSR and hydration

- No page image request exists today, so there was no image LCP to resize, preload or re-encode.
- The 119,979-byte Open Graph JPEG remains a social metadata asset and is not loaded by page markup.
- The Portfolio uses the system font stack. No local or remote font file and no unused font weight
  was found.
- SSR/SEO validation passed for 12 public routes, four real HTTP 404 routes and three SEO assets.
- Direct requests returned complete localized HTML with deterministic IDs and metadata.
- Hydrated Home and Contact produced no browser console errors in the representative checks.
- No duplicate application request was observed. Contact performs no request until a valid submit.
- Storybook's TypeScript input was narrowed to real preview and story entry points, removing its
  unused-file warnings. The static documentation build still reports Webpack's generic 244 KiB
  asset/entrypoint size hints for Storybook runtime bundles; these do not ship with Portfolio and
  were not hidden by raising or disabling the limits.

## Responsive and manual coverage

Automated Lighthouse covered its mobile emulation and desktop preset. Hydrated browser checks
covered Light, Dark and System selection, English/Spanish switching, Home and Contact at 1280 px,
focus after locale navigation, LinkedIn attributes, invalid form focus and horizontal overflow.
The route-level SSR validator covered the complete EN/ES route set and both localized Not Found
paths.

The Codex browser environment did not expose reliable viewport resizing or browser zoom controls.
Therefore 320, 375, 768, 1024 and 1440 px in every theme, 200% browser zoom, real mobile menu
operation, a real screen reader and physical devices still require the manual release pass. This is
an explicit limitation, not a successful validation claim.

## Validation commands

Run from `angular-design-system/`:

```bash
npm run build:portfolio
npm run validate:portfolio:output
npm test -- --watch=false
npm run build
npm run build-storybook
```

Run Lighthouse against a Netlify Deploy Preview and repeat it against production; Lighthouse
remains intentionally outside production dependencies.

## Regression checklist

For every new public page:

1. Keep page content and metadata in its route-local typed registry.
2. Confirm the initial and new lazy chunk sizes with a production stats build.
3. Verify prerendered HTML locally, then validate localized metadata and a real 404 on Netlify.
4. Test keyboard order, visible focus, focus after navigation, landmarks and heading order.
5. Review Light, Dark and System at 320, 375, 768, 1024 and 1440 px and at 200% zoom.
6. Review contrast, reduced motion, alternative text, link purpose and form announcements.
7. Run Lighthouse more than once when results vary and distinguish lab data from field data.
8. Run tests, all builds and Storybook checks without suppressing warnings.

## Production follow-up

Deployment-specific validation and release steps live in
[`deployment.md`](deployment.md) and [`production-checklist.md`](production-checklist.md).

- Complete the manual viewport/theme/zoom matrix in target browsers.
- Perform a screen-reader smoke test without claiming a formal audit.
- Decide separately whether Storybook needs custom, evidence-based documentation bundle limits;
  its current generic Webpack size hints remain visible.
- Measure production behavior after hosting, caching, compression and the final domain are known.
- Add production security headers, monitoring and hosting cache rules at the deployment boundary.
- Use real-user monitoring or CrUX data before making field Core Web Vitals claims.
