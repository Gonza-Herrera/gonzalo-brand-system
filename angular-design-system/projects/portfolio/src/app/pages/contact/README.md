# Contact page

Contact is the localized public conversation entry point for the Portfolio:

- `/en/contact`
- `/es/contact`

The page explains useful conversation topics, resolves only verified public channels, exposes the
future message form contract honestly, documents privacy expectations and links to Experience,
Projects and Content. It is a lazy standalone page and remains deterministic for SSR and hydration.

## Current architecture

```text
Localized Contact route
    ↓
PortfolioLocaleService locale Signal
    ↓
Lazy contact-content.registry.ts
    ↓
ContactPage composition
    ├──→ verified channels from PORTFOLIO_CONFIG.urls
    ├──→ unavailable Typed Reactive Form
    └──→ localized Experience / Projects / Content links
```

The repository currently has no approved backend, form provider, endpoint, public email address or
social profile URL. This is **scenario C** from the implementation brief:

- no request is performed;
- no success state is simulated;
- all form controls and the submit button are disabled before interaction;
- an `aria-live` status explains why;
- email, LinkedIn and GitHub cards are omitted because their destinations are unconfigured.

The full EN/ES Contact content is imported by the lazy page through
`content/contact-content.registry.ts`. Only basic Contact metadata remains in the global site
registry, avoiding the cost of the form copy on unrelated routes.

## Page composition

1. Hero with one `h1` and three stable professional focus IDs.
2. What We Can Discuss with six stable topic IDs.
3. Contact Channels or an explicit localized empty state.
4. Contact Form with a typed, disabled form and unavailable status.
5. Privacy and Security with confidential-data guidance.
6. Explore More with locale-aware links to Experience, Projects and Content.

The page reuses public `gh-hero`, `gh-section`, `gh-container`, `gh-stack`, `gh-feature-grid`,
`gh-card`, `gh-section-heading` and `gh-button` APIs. Native form controls remain Portfolio-private
because the Design System does not yet expose a general form-control family.

## Localized content and parity

`content/models/contact-content.model.ts` owns readonly contracts plus stable highlight, topic and
channel IDs. `en/contact.content.ts` and `es/contact.content.ts` satisfy the same contract. Tests
protect ID order, form-field shape, status messages, Explore destinations and the absence of URLs or
personal data in localized copy.

Do not translate IDs. Do not add an available channel until a real destination is approved.

## Channel configuration

All public destinations belong in `core/config/portfolio.config.ts` under
`PORTFOLIO_CONFIG.urls`:

```ts
urls: {
  email: undefined,
  linkedin: undefined,
  github: undefined,
}
```

- Email must be a verified `mailto:` destination approved for public use.
- LinkedIn and GitHub must be verified `https://` profile URLs.
- Never place destinations in locale content, templates or component classes.
- Unconfigured, empty or protocol-incompatible destinations are omitted by
  `resolvePortfolioContactChannels`.

Updating one of these values changes the Contact channel list only after the associated content and
privacy implications have been reviewed. No credential belongs in client configuration.

## Form contract

`ContactFormComponent` uses a non-nullable typed Reactive Form with Name, Email, optional Company or
Organization, Subject and Message. Constants in `models/contact-form.model.ts` define:

- name: 100 characters;
- email: 254 characters;
- company: 150 characters;
- subject: 160 characters;
- message: 20–3000 characters.

Required text fields use Angular validators plus `nonWhitespaceValidator`. Email uses Angular's
built-in email validator. `normalizeContactFormValue` trims boundary whitespace, turns an empty
company into `undefined`, preserves Unicode and internal line breaks, and deliberately preserves
email case.

The closed status union is `idle | submitting | success | error | unavailable`. Only
`unavailable` is reachable today. Success copy exists in the localized contract for a future real
integration but is never rendered or activated without confirmed service success.

## Adding a real submission integration

No environment files or Contact endpoint exist today. A future implementation must:

1. approve and document one backend or provider;
2. establish the repository's environment/configuration strategy;
3. add a public endpoint URL without client secrets;
4. introduce a small typed Contact service or gateway;
5. send only `PortfolioContactSubmissionPayload`;
6. map network, validation, rate-limit and server failures to non-technical localized feedback;
7. prevent concurrent submissions and never retry automatically;
8. focus the first invalid field after invalid submit and the status heading after success/error;
9. reset only after confirmed success and preserve data after errors;
10. add HttpClient mocks for success, error and unavailable tests.

Do not add EmailJS, Formspree, Netlify Forms, CAPTCHA or another provider without explicit approval.

## Privacy, security and spam

The disabled form does not send or store values. There is no local/session storage, IndexedDB,
analytics or console logging of contact data. The page asks visitors not to include credentials,
confidential information or sensitive customer data.

A future backend must own server-side validation, payload limits, rate limiting and an approved spam
strategy. Client validators are user feedback, not a security boundary. Do not claim legal
compliance or create a privacy-policy URL without reviewed policy text.

## Accessibility and responsive behavior

- One `h1`; section headings are `h2` and cards/statuses use `h3`.
- Every form control has a stable ID, visible label, description, native autocomplete where
  appropriate, required semantics and an error target for `aria-describedby`.
- The unavailable explanation uses `role="status"`, `aria-live="polite"` and visible text.
- Disabled state is communicated before the form, not only through disabled controls.
- External channels, once configured, receive safe new-tab behavior through Feature Grid.
- The form grid collapses from two columns to one below 48rem; textarea resize remains vertical.
- All visual values use semantic `--gh-*` variables and reduced-motion removes transitions.
- There is no viewport, random ID, date, browser storage or DOM read during render.

Focus movement after validation or submission is intentionally inactive while submission itself is
unavailable. It must be implemented and tested with the real integration rather than simulated.

## Tests and limits

Portfolio tests cover locale parity, stable IDs, configuration filtering, validators,
normalization, disabled/unavailable behavior, labels, IDs, safe internal routes, metadata, language
switching and direct lazy routing.

Advanced canonical links, full `hreflang`, Open Graph, structured data, sitemap and social images
remain PR 18 scope.
