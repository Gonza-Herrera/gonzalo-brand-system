# Release process

The Angular library is currently versioned inside this repository and is not published to a public npm registry. A release means a verified library build and documentation snapshot suitable for local installation or a future package-publishing workflow.

## Before release

1. Confirm the intended public API in `projects/gh-design-system/src/public-api.ts`.
2. Confirm token JSON is the source of any generated changes.
3. Review breaking changes, migration notes, and documentation.
4. Ensure example content contains no private or production credentials.
5. Run the complete validation suite from `angular-design-system/`.

```bash
npm ci
npm run tokens:check
npm run build
npm test -- --watch=false
npm run build-storybook
```

Run interaction and accessibility tests against a live Storybook:

```bash
# terminal 1
npm run storybook

# terminal 2
npm run test-storybook
```

## Manual review

- Review Storybook Introduction, Foundations, Components, Layout, Patterns, and Compositions.
- Review light and dark themes.
- Review relevant stories at mobile, tablet, and desktop widths.
- Confirm Controls, Autodocs, source snippets, assets, and external-link behavior.
- Review the Showcase routes and complete pattern landing in both themes.
- Inspect keyboard navigation, visible focus, headings, landmarks, and the accessibility panel.

## Version and artifacts

Only update the package version when a real release is being prepared. Use semantic-versioning intent:

- Patch — compatible bug, documentation, or test correction.
- Minor — backward-compatible public feature.
- Major — breaking public API, token contract, style entrypoint, or behavior change.

The verified package is generated at `dist/gh-design-system`. Storybook's generated `storybook-static/` and Compodoc's `documentation.json` are build artifacts and are not committed.

Do not run `npm publish` until the repository has an approved registry, package ownership, provenance, and release automation strategy. If publishing is introduced, document the exact registry, authentication, tag, rollback, and changelog process here before the first release.
