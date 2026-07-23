# Portfolio Contact form

This document defines the production boundary for the Portfolio message form. The current
implementation intentionally represents an unavailable integration rather than a fake successful
submission.

## Current scenario

No backend, approved form provider, endpoint, environment variable, public contact destination or
privacy policy is present in the repository. The form therefore:

- uses Typed Reactive Forms and real validation rules;
- renders all fields disabled;
- exposes `unavailable` through visible and live-region feedback;
- sends no HTTP request;
- stores and logs no personal data;
- never renders success feedback.

## Data contract

The editable form shape is `PortfolioContactFormValue`:

```ts
{
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}
```

Normalization produces `PortfolioContactSubmissionPayload`, where `company` is optional. No phone,
address, budget, credential, attachment, tracking value or sensitive identifier is collected.

## Validation and limits

| Field   | Required | Rules                                    |
| ------- | -------- | ---------------------------------------- |
| Name    | Yes      | non-whitespace, maximum 100              |
| Email   | Yes      | Angular email validation, maximum 254    |
| Company | No       | maximum 150                              |
| Subject | Yes      | non-whitespace, maximum 160              |
| Message | Yes      | non-whitespace, minimum 20, maximum 3000 |

`nonWhitespaceValidator` does not rewrite input. Localized errors belong to Contact content and are
associated with stable field IDs through `aria-describedby`. Errors are designed to appear after
touch or an invalid submit once a real submission flow exists.

## Normalization

`normalizeContactFormValue` is pure and does not mutate the form value. It:

- trims boundary whitespace from every field;
- changes an empty company to `undefined`;
- preserves Unicode and internal message line breaks;
- trims but does not lowercase email, avoiding assumptions about the local part.

The normalized payload must be created only immediately before a configured submission. It must not
be persisted or logged.

## Submission states

The closed state union is:

```text
idle → submitting → success
                  ↘ error
unavailable
```

The current page starts and remains `unavailable`. A future implementation may enter `success` only
after a real service confirms the request. Errors must preserve input and expose a manual retry;
concurrent submit attempts must be ignored while `submitting`.

## Future service boundary

After a backend or provider is approved, add one typed service/gateway that accepts
`PortfolioContactSubmissionPayload` and returns a typed result. Use the repository's chosen public
environment strategy for the endpoint. Never hardcode a production endpoint in a component and
never place secrets in browser environments, headers or source control.

The client must not retry messages automatically. General user feedback may distinguish network,
rate-limit, server and validation outcomes only when the real backend supports those meanings.
Tests must use HttpClient mocks and must not reach the production endpoint.

## Security, privacy and spam

Client validation is not a security or anti-spam control. A production backend must provide:

- authoritative schema and payload-size validation;
- appropriate rate limiting;
- an approved spam strategy;
- safe logging that excludes message bodies and unnecessary personal data;
- transport and retention behavior aligned with reviewed privacy copy.

Do not add a decorative honeypot or CAPTCHA without compatible server behavior and approval. Do not
claim GDPR compliance, absolute security or retention guarantees without legal and technical
evidence.

## Accessibility and focus

All fields require visible labels, stable IDs, logical DOM order, native autocomplete and specific
linked errors. Status feedback must use a restrained live region and visible text. With a real
integration, invalid submit must focus the first invalid control (or a correctly implemented error
summary); success/error must focus their status heading without browser access during SSR render.

While the form is unavailable no focus is moved: visitors cannot enter or submit data, and the
reason is announced before the fieldset.

## Testing checklist for activation

Before enabling submission, add tests for:

- invalid submit, `markAllAsTouched` and first-invalid focus;
- payload normalization and request body;
- one request during `submitting`;
- confirmed success and optional reset;
- error feedback, preserved values and manual retry;
- endpoint-unconfigured fallback;
- network/rate-limit/server mapping actually supported by the backend;
- no payload logging or browser persistence;
- SSR, hydration and direct `/en/contact` and `/es/contact` refreshes.

Provider approval, deployment, legal policy, CAPTCHA, analytics and advanced SEO remain outside the
current Contact implementation.
