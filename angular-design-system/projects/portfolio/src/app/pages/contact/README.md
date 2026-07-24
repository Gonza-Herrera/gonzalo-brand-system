# Contact page

Contact is the localized public conversation entry point:

- `/en/contact`
- `/es/contact`

It combines the existing Hero, conversation topics, verified channels, a functional Web3Forms
message form, privacy guidance and locale-aware links to Experience, Projects and Content.

## Architecture

```text
Localized Contact route
    ↓ lazy contact.routes.ts
HttpClient(withFetch) + ContactService
    ↓
ContactPage composition
    ├──→ typed EN/ES contact registry
    ├──→ verified channels from PORTFOLIO_CONFIG.urls
    ├──→ ContactFormComponent
    └──→ localized Experience / Projects / Content links
```

`contact.routes.ts` keeps HTTP and provider code lazy. `ContactService` accepts the form domain
value, validates injected configuration, maps the seven permitted Web3Forms fields and normalizes
provider/network failures. It does not own UI copy, form resets, navigation or logging.

## Form behavior

The form collects only Name, Email, Subject and Message. `botcheck` is an off-screen checkbox used
as a honeypot. Typed Reactive Forms enforce:

- Name: required, non-whitespace, 2–80 characters after trim for the minimum.
- Email: required, Angular email validation, maximum 160.
- Subject: required, non-whitespace, 3–120 characters after trim for the minimum.
- Message: required, non-whitespace, 20–2000 characters after trim for the minimum.

Invalid submit marks fields touched and shows localized linked feedback. A valid submit enters
`submitting`, disables the button and ignores duplicates. Confirmed success resets to empty,
pristine and untouched; an error preserves all values for retry. Global success/error feedback
stays visible until the next submit.

`mapContactFormToWeb3FormsPayload` trims values without mutation and sends only `access_key`,
`from_name`, `name`, `email`, `subject`, `message` and `botcheck`.

## Configuration and fallback

`core/config/portfolio.config.ts` owns:

- the fixed Web3Forms endpoint;
- an empty public `accessKey`;
- the provider-facing `fromName`;
- verified public channel URLs, currently the LinkedIn profile;
- an optional direct-email destination.

No real access key or personal email is committed. The verified LinkedIn URL is centralized in
`PORTFOLIO_CONFIG.urls.linkedin`; localized content owns its label, description, action and
accessible label without duplicating the destination. With an empty form key, the form renders a
localized unavailable state and sends no request. If `PORTFOLIO_CONFIG.urls.email` contains a
verified `mailto:` URL, that address stays visible below the form during idle, success, error and
unavailable states.

See the [Contact form integration guide](../../../../../../docs/portfolio-contact-form.md) for setup
and provider replacement.

## Content and channels

`contact-content.registry.ts` is loaded only with Contact. The EN/ES contracts keep stable highlight,
topic and channel IDs plus equivalent form labels, placeholders, validators and status feedback.
Configuration—not localized content—owns destinations and provider settings.

`resolvePortfolioContactChannels` omits empty or protocol-incompatible URLs. The channel section
renders the verified LinkedIn card and retains its localized empty state for configurations where
no channel resolves. Never add a placeholder channel to make a card or email fallback render.

## Accessibility and responsive behavior

- One `h1`; section headings remain `h2`.
- Native form, fieldset, labels, stable IDs and a submit button.
- Errors use `aria-invalid` and `aria-describedby`.
- The form announces busy, unavailable, success and error states without forced focus.
- The honeypot has no keyboard or reading-order presence but remains in the DOM.
- Only the button is disabled while submitting; field values remain visible.
- The form grid collapses to one column below 48rem.
- Fallback email wraps safely and textarea resize remains vertical.
- All visual values use semantic `--gh-*` tokens in Light, Dark and System.

## SSR, privacy and tests

The initial state is configuration-driven and deterministic. Rendering uses no browser globals,
storage, random IDs or timestamps, and no HTTP request occurs before user submit.

Messages are not persisted, tracked or logged. The component sends no company, phone, budget,
attachment, browser metadata or arbitrary HTML.

Tests cover validators, mapper, service HTTP behavior, form states, honeypot, duplicate prevention,
localization, routing and metadata. Provider tests use Angular's HTTP testing backend; no real
message is sent.
