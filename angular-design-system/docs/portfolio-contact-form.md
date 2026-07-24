# Portfolio Contact form

The Portfolio message form submits directly from Angular to Web3Forms without a custom backend. It
uses Typed Reactive Forms, a lazy `HttpClient` provider, an explicit provider mapper, localized
feedback and a central public configuration.

## Runtime architecture

```text
/en/contact or /es/contact
    ↓ lazy contact.routes.ts
provideHttpClient(withFetch) + ContactService
    ↓
ContactFormComponent
    ↓ valid user submit
mapContactFormToWeb3FormsPayload
    ↓ POST
https://api.web3forms.com/submit
```

The HTTP provider and service are registered by the lazy Contact route. They do not add Web3Forms
code to unrelated page chunks. `withFetch()` follows Angular's SSR-compatible transport
recommendation, while the request itself can run only after a user submits the form and never during
server rendering.

## Configuration

The public configuration lives in
`projects/portfolio/src/app/core/config/portfolio.config.ts`:

```ts
contactForm: {
  provider: 'web3forms',
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '',
  fromName: 'Gonzalo Herrera Portfolio',
}
```

The repository has no environment or runtime-configuration pipeline. For that reason, this PR does
not invent a `.env` file or use `process.env` in browser code. The central `PORTFOLIO_CONFIG` value
is the implemented build-time source and `CONTACT_FORM_CONFIG` is its injectable boundary.

To enable a deployment:

1. Create a Web3Forms account and register the recipient email.
2. Obtain the Web3Forms access key.
3. Supply the public access key through a deployment-specific replacement or override of
   `CONTACT_FORM_CONFIG`.
4. Configure the verified direct email as a `mailto:` URL in `PORTFOLIO_CONFIG.urls.email`.
5. Build and run the Portfolio.
6. Submit one real test message and confirm the delivered sender, subject and body.

The Web3Forms access key is intentionally used by browser code and is not a password, SMTP
credential or private server secret. Even so, no real key is committed to this public repository.
Never add an email password, private API token, arbitrary headers or a recipient override to the
client. See the [official Web3Forms API reference](https://docs.web3forms.com/getting-started/api-reference)
for the provider contract.

When `accessKey` is empty, the application still builds and SSR still renders Contact. The form
shows localized unavailable feedback, disables its fieldset and performs no request. A configured
direct email remains visible independently of the form state. No unverified email address is
included in the repository today. Error feedback mentions direct email only when that verified
fallback exists.

## Data contract and provider mapping

The editable form shape is:

```ts
{
  name: string;
  email: string;
  subject: string;
  message: string;
  botcheck: boolean;
}
```

`mapContactFormToWeb3FormsPayload` is pure and maps only:

```ts
{
  access_key: string;
  from_name: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  botcheck: boolean;
}
```

It trims boundary whitespace from configuration and user text without mutating the original value.
Unicode and internal message line breaks are preserved. No phone, company, budget, attachment,
route, browser metadata, tracking value or recipient field is collected or sent.

`ContactService` rejects missing configuration and a checked honeypot before HTTP. It treats both
network failures and `{ success: false }` provider responses as a controlled
`ContactSubmissionError`. Provider messages are never rendered or logged.

## Validation

| Field    | Required | Rules                                                   |
| -------- | -------- | ------------------------------------------------------- |
| Name     | Yes      | non-whitespace, trimmed minimum 2, maximum 80           |
| Email    | Yes      | Angular email validation, maximum 160                   |
| Subject  | Yes      | non-whitespace, trimmed minimum 3, maximum 120          |
| Message  | Yes      | non-whitespace, trimmed minimum 20, maximum 2000        |
| Botcheck | No       | must remain `false`; removed from keyboard reading flow |

`nonWhitespaceValidator` and `trimmedMinLengthValidator` are pure and do not rewrite controls.
Localized errors appear only after touch or an invalid submit and are connected through stable IDs,
`aria-invalid` and `aria-describedby`.

## Submission states

```text
idle → submitting → success
                  ↘ error
unavailable
```

- Duplicate submits are ignored while `submitting`.
- Only the submit button becomes disabled while a request is active; fields remain readable.
- Success resets the form to empty, pristine and untouched while keeping confirmation visible.
- Error preserves every value and leaves the button available for a manual retry.
- Missing configuration enters `unavailable` without throwing during initialization.
- Editing after an error does not dismiss global feedback; the next submit replaces the state.

The client never retries automatically.

## Honeypot, privacy and security

`botcheck` is an off-screen checkbox with a stable label, `tabindex="-1"` and
`autocomplete="off"`. It remains in the DOM and payload contract but outside the visual and
assistive-technology reading flow. If it is checked, neither the component nor service issues a
request.

Client validation and the honeypot improve feedback and basic spam resistance; they are not a
server-side security boundary. The form:

- stores no draft in local storage, session storage, cookies or IndexedDB;
- adds no analytics or field tracking;
- logs no name, email, subject, message, key or provider response;
- renders no user HTML and accepts no attachments;
- sends only after a real browser submit.

Web3Forms owns provider-side validation, delivery and rate limiting. CAPTCHA, Turnstile, a custom
backend and legal-policy work remain separate decisions.

## Accessibility, localization and responsive behavior

- One semantic `<form>` and native `<button type="submit">`.
- Four visible fields with labels, placeholders, stable IDs and suitable autocomplete.
- Validation summary and field-specific linked feedback.
- `aria-busy` during submission.
- Polite success/unavailable status and assertive error feedback near the form.
- No forced focus movement; live regions preserve the user's current context.
- EN/ES content updates through the existing locale Signal without resetting form state.
- One-column layout below 48rem, wrapping fallback email, vertical textarea resizing and no fixed
  height.
- Semantic theme tokens support Light, Dark and System; reduced motion removes control transitions.

## SSR and hydration

The initial state depends only on deterministic injected configuration. The component does not read
`window`, `document`, storage, time or random values. HTTP runs only from `submit()`, never while
server-rendering. Direct `/en/contact` and `/es/contact` requests therefore produce stable server and
client markup.

## Tests

Portfolio tests cover:

- mapper fields, trimming, non-mutation and absence of extra data;
- whitespace and trimmed-length validators;
- successful POST, provider failure, HTTP 400/429/500, missing key and honeypot;
- invalid form, duplicate submit, loading, reset-on-success and preserve-on-error;
- unavailable configuration, fallback email, EN/ES content and accessible field wiring;
- localized Contact routing, metadata and SSR-compatible builds.

No test reaches the real Web3Forms endpoint.

## Replacing Web3Forms

Keep the form domain model and component state contract. Replace the provider-specific mapper,
response model, `ContactService` transport and injected configuration behind
`CONTACT_FORM_CONFIG`. Do not leak provider response details or transport fields into localized
content.
