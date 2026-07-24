# Portfolio production checklist

## Automated gate

- [ ] `npm ci`
- [ ] `npm run tokens:check`
- [ ] `npm run seo:check`
- [ ] `npm run test:deployment-config`
- [ ] `npm test -- --watch=false`
- [ ] `npm run build`
- [ ] strict `npm run build:portfolio:production` with production variables
- [ ] `npm run build-storybook`
- [ ] `npm audit`
- [ ] no build/test errors or unexplained warnings

## Netlify configuration

- [ ] Site name is `gonzalo-herrera-dev`
- [ ] GitHub repository and production branch are connected
- [ ] Base directory is `angular-design-system`
- [ ] Publish directory is `dist/portfolio/browser`
- [ ] `SITE_URL` is available to all build contexts
- [ ] `WEB3FORMS_ACCESS_KEY` is available only to production builds
- [ ] Deploy Previews are enabled for pull requests
- [ ] `.netlify/state.json` and `.env` files are untracked

## Deploy Preview

- [ ] Preview build succeeds from a clean install
- [ ] `/en` and `/es` return HTTP 200
- [ ] every navigation route survives a direct refresh
- [ ] unknown direct URL returns HTTP 404 and the static bilingual page
- [ ] preview sends `X-Robots-Tag: noindex, nofollow`
- [ ] preview `robots.txt` disallows crawling and `sitemap.xml` is absent
- [ ] canonical and hreflang still target production
- [ ] contact form is visibly unavailable and issues no request
- [ ] light, dark and system themes work
- [ ] EN/ES switch and keyboard navigation work
- [ ] no CSP, console, hydration or missing-asset errors
- [ ] mobile and desktop Lighthouse runs are recorded

## Production

- [ ] production deploy succeeds
- [ ] root and five legacy redirects return HTTP 301
- [ ] all 20 localized public routes return HTTP 200
- [ ] unknown root and localized URLs return HTTP 404
- [ ] HTML revalidates; hashed JS/CSS use immutable cache
- [ ] security headers and CSP are present
- [ ] production is indexable; no preview `_headers` remains
- [ ] `robots.txt`, `sitemap.xml`, favicon and social image return HTTP 200
- [ ] canonical, hreflang, Open Graph, Twitter Card and JSON-LD use production origin
- [ ] one Web3Forms message succeeds and delivery is confirmed
- [ ] Web3Forms production-domain restriction is configured if enabled
- [ ] LinkedIn and all internal navigation links work
- [ ] rollback to the last known-good deploy is understood

## Manual follow-up

- [ ] Rotate the formerly versioned Web3Forms access key before launch
- [ ] Review the final social image
- [ ] Validate Google Rich Results and Bing/Google indexing tools
- [ ] Validate LinkedIn, Slack, WhatsApp, Discord and X/Twitter previews
- [ ] Repeat accessibility checks with a real screen reader and physical mobile device
